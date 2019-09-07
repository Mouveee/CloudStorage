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

	if (content.type === "file") {
		fs.unlink(`./external/${content.location}${content.item}`, e => {
			if (e) {
				let error = {};
				error.message = e.message;
			} else {
				console.log("job done!");
			}
		});
	} else {
		rimraf.sync(`./external/${content.location}${content.item}`);
		console.log("job SHOULD be done... _%_/");
		res.statusCode = 200;
		res.send("your server did it, take more care of him");
	}
});

app.post("/download", async function (req, res) {
	console.log(`${process.env.DOTS}\nsomebody requested: ${req.body.file}`);
	let file = new Promise((resolve, reject) => {
		fs.readFile(
			`./external/${req.body.folder}${req.body.file}`,
			(err, content) => {
				if (err) {
					reject(
						`error finding ./external/${req.body.folder}${req.body.file} :( `
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
					`${__dirname}/external/${req.body.folder}/${req.body.file}`
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
	let splitted = req.body.content.folder.split('./');
	const fileName = splitted.pop();

	console.log('check if ' + `./external/zipped/${req.body.content.folder + '.zip'}` + 'already exists...')

	if (fs.existsSync(`./external/zipped/${req.body.content.folder + '.zip'}`)) {
		console.log('this folder has already been zipped');

		res.status = 409;
		res.send(JSON.stringify({ message: 'folder has alredy been zipped, please delete first' }))
	} else {

		console.log(`download folder: ${'./external/' + req.body.content.folder}\nfile: ${`./external/zipped/${fileName + '.zip'}`}`);

		// zip a folder
		console.log("zip a folder");

		var archive = archiver.create('zip', {});
		var output = fs.createWriteStream(`./external/zipped/${fileName + '.zip'}`);
		archive.pipe(output);

		archive
			.directory('./external/' + req.body.content.folder, false);


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

	console.log(process.env.DOTS);
	console.log(`received POST request (get folder) with params: ${req.body.content}`);

	try {
		objectToSend = getFolderContent(dir);
	}
	catch (e) {
		console.log(`couldn't find folder, e.message ${e.message}`);

		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'folder not found' }))
	}


	res.statusCode = 200;
	res.send(JSON.stringify(objectToSend));
});

app.post("/move", (req, res) => {
	const source = './external/' + req.body.content.itemToMove;
	const target = './external/' + req.body.content.targetFolder;

	let sourceSplitted = source.split('/');
	let item = sourceSplitted.pop();

	console.log(
		`moving request received, moving ${source} to ${target}`
	);

	fs.renameSync(source, target + '/' + item)

	res.statusCode = 200;
	res.send(JSON.stringify({ message: "you are a weirdo" }));
});

app.post("/upload", (req, res) => {
	const uploadedFile = req.files.file;
	uploadedFile.mv(`./external/${req.files.file.name}`);

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
	console.log(`Example app listening at http://${host}:${port}`);
});
