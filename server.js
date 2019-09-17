require("dotenv").config();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const https = require("https");
const rimraf = require("rimraf");

const archiver = require('archiver');


const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "external")));
app.use(fileUpload());

function getFolderContent(folder) {
	let objectToSend = {};
	let dirContent = fs.readdirSync(`${folder}`);
	let files = [];
	let folders = [];

	dirContent.map(object => {
		let current = folder + "/" + object;

		if (fs.statSync(current).isDirectory()) {
			let folderObject = {};

			folderObject.name = object;
			folderObject.modified = fs.statSync(current).mtime;
			folders.push(folderObject);
		} else {
			let file = {};

			file.name = object;
			file.size = fs.statSync(current).size;
			file.modified = fs.statSync(current).mtime;
			files.push(file);
		}
	});

	objectToSend.files = JSON.stringify(files);
	objectToSend.folders = JSON.stringify(folders);

	return objectToSend;
}

app.post("/createfolder", (req, res) => {
	let objectToSend = {};

	console.log(
		`${process.env.DOTS}\nsomebody wants me to create folder ./external/${req.body.content}`
	);
	if (req.body.content && !fs.existsSync(`./external/${req.body.content}`)) {
		console.log(`no naming conflict, creating folder: ${req.body.content}`);

		fs.mkdirSync(`./external/${req.body.content}`);
		objectToSend = getFolderContent(`./external/` + req.body.content);
		res.statusCode = 200;
		res.send(JSON.stringify(objectToSend));
	} else if (fs.existsSync(`./external/${req.body.content}`)) {
		console.log(`naming conflict, folder ${req.body.content}`);

		res.statusCode = 409;
		res.send(JSON.stringify({ message: "folder already exists" }));
	}
});

app.post("/delete", (req, res) => {
	let content = req.body.content;

	console.log(`deletion of ${content.length} items...`)

	content.map(item => {
		console.log(`item: ${Object.keys(item)}\nname: ${item.name}`);
		if (item.type === "file") {
			fs.unlink(item.name, e => {
				if (e) {
					let error = {};
					error.message = e.message;
				} else {
					console.log("job done!");
				}
			});
		} else {
			rimraf.sync(item.name);
			console.log("deletion SHOULD be done... \\_%_/");
		}
	})

	res.statusCode = 200;
	res.send(JSON.stringify({ message: "your server did it, take more care of him" }));
})

app.post("/download", async function (req, res) {
	console.log(`${process.env.DOTS}\nsomebody requested: ${req.body.file}`);
	let file = new Promise((resolve, reject) => {
		fs.readFile(
			`${req.body.folder}${req.body.file}`,
			(err, content) => {
				if (err) {
					reject(
						`error finding ${req.body.folder}${req.body.file} :( `
					);
				} else {
					resolve(content);
				}
			}
		);
	})
		.then(async content => {
			content = { content: content.slice(2) };

			res.setHeader("File", req.body.file);
			await res.download(
				path.normalize(
					`${__dirname}/${req.body.folder}/${req.body.file}`
				),
				req.body.file,
				e => {
					if (e) {
						console.log(`error sending file: ${e}`);
					}
				}
			);
		})
		.catch(e => {
			console.log(`promise itemHandler catched: ${e}`);
			res.statusCode = 404;
			res.send(JSON.toString({ error: "file not found" }));
		});
});

app.post('/downloadFolder', async (req, res) => {
	let splitted = req.body.content.folder.split('/');
	const fileName = splitted.pop();

	console.log('check if ' + `./internal/${req.body.content.folder + '.zip'}` + ' already exists...')

	if (fs.existsSync(`./internal/${fileName + '.zip'}`)) {
		console.log('this folder has already been zipped');

		res.status = 409;
		res.send(JSON.stringify({ message: 'folder has alredy been zipped, please delete first' }));
		console.log('sent the sad news')
	} else {
		console.log('it doesn`t')
		let archive = archiver.create('zip', {});
		let output = fs.createWriteStream(`./internal/${fileName + '.zip'}`);
		archive.pipe(output);

		archive
			.directory(req.body.content.folder, false);


		output.on('finish', function () {
			console.log('zipping should have worked')

			res.statusCode = 200;
			res.send(JSON.stringify({ message: 'you lucky motherfucker' }))
			console.log('Data has been drained');
		});

		archive.finalize();
	}
})

//list file content
app.post("/external", (req, res) => {
	let objectToSend = {};
	let dir = req.body.content || "./external/";

	let noError = true;

	console.log(process.env.DOTS);
	console.log(`received POST request (get folder) with params: ${req.body.content}`);

	try {
		objectToSend = getFolderContent(dir);
	}
	catch (e) {
		console.log(`e.message: ${e.message}`);
		noError = !noError;

		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'folder not found' }))
	}
	if (noError) {
		res.statusCode = 200;
		res.send(JSON.stringify(objectToSend));
	}
});

app.post("/move", async (req, res) => {
	const source = req.body.content.itemToMove;
	const target = req.body.content.targetFolder;

	if (typeof source === 'string') {
		let sourceSplitted = source.split('/');
		let item = sourceSplitted.pop();

		if (fs.existsSync(target + '/' + item)) {
			res.statusCode = 409;
			res.send(JSON.stringify({ message: `${item} already exists in target location...` }));
		}

		fs.renameSync(source, target + '/' + item);

	} else {
		await source.map(item => {
			console.log('moving request for: ' + item.name);
			let splittedItemName = item.name.split('/');
			let itemName = splittedItemName.pop();

			fs.renameSync(item.name, target + '/' + itemName);
		})
	}

	res.statusCode = 200;
	res.send(JSON.stringify({ message: "moving succesful" }));
});


let uploadCalled = 0;
app.post("/upload", (req, res) => {
	const uploadedFile = req.files.file;

	console.log('called upload: ' + ++uploadCalled)
	console.log('req.rawheaders: ' + Object.keys(req.body.file));

	try {
		uploadedFile.mv(`./external/${req.files.file.name}`);
	} catch (e) {
		res.status = 500;
		res.send(JSON.stringify({ message: e.message }))
	}


	console.log('req keys: ' + Object.keys(req));
	console.log(`uploaded file name: ${req.files.file.name}`);

	res.statusCode = 200;
	res.send("1234");
});

app.post('/rename', (req, res) => {
	console.log(`renaming ${req.body.content.oldName} to ${req.body.content.newName}`);

	let source = './external/' + req.body.content.oldName;
	let target = './external/' + req.body.content.newName

	fs.renameSync(source, target);

	res.statusCode = 200;
	res.send(JSON.stringify({ message: 'naming successfully' }));
})

const server = app.listen(5000, "127.0.0.1", function () {
	const host = server.address().address;
	const port = server.address().port;

	fs.existsSync('./external') ? null : fs.mkdirSync('./external');
	fs.existsSync('./internal') ? null : fs.mkdirSync('./internal');

	console.log(`Example app listening at http://${host}:${port}`);
});
