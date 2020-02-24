require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const https = require("https");
const rimraf = require("rimraf");
const archiver = require('archiver');


const registeredUsers = JSON.parse(process.env.USERS).users;

const httpsOptions = {
	key: fs.readFileSync("./security/_.huwig-webdev.de_private_key.key"),
	cert: fs.readFileSync("./security/huwig-webdev.de_ssl_certificate.cer"),
	// ca: [

	// 	fs.readFileSync('path/to/CA_root.crt'),

	// 	fs.readFileSync('path/to/ca_bundle_certificate.crt')

	// ]
};

const corsOptions = {
	origin: true,
	optionsSuccessStatus: 200,
	credentials: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "external")));
app.use(fileUpload());


function createHash(stuffToHash) {
	const hash = bcrypt.hashSync(stuffToHash, 10, function (err, hash) {
		// Store hash in database
		console.log(`hashed to: ${hash}`);

		return hash;
	});

	return hash;
}



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
		console.log(`creating folder: ${req.body.content}`);

		fs.mkdirSync(`./external/${req.body.content}`);
		objectToSend = getFolderContent(`./external/` + req.body.content);

		res.statusCode = 201;
		res.send(JSON.stringify(objectToSend));
	} else if (fs.existsSync(`./external/${req.body.content}`)) {
		console.log(`naming conflict, folder ${req.body.content}`);

		res.statusCode = 409;
		res.send(JSON.stringify({ message: "folder already exists" }));
	}
});


app.post("/delete", (req, res) => {
	let content = req.body.content;

	for (key in content) {
		if (content[key].type === "file") {
			fs.unlink(content[key].name, e => {
				if (e) {
					let error = {};
					error.message = e.message;
				} else {
					console.log(`deleted ${content[key].name}`);
				}
			});
		} else {
			rimraf.sync(content[key].name);
			console.log("deletion SHOULD be done... \\_%_/");
		}
	}

	res.statusCode = 200;
	res.send(JSON.stringify({ message: "your server did it, take more care of him" }));
})


app.post("/download", async function (req, res) {
	console.log(`${process.env.DOTS}\nsomebody requested: ${req.body.file}`);
	const file = `${req.body.folder}${req.body.file}`;

	res.setHeader("File", req.body.file);

	res.statusCode = 200;
	res.download(file, req.body.file, err => {
		if (err) {
			console.log('file seems to be missing');

			res.statusCode = 404;
			res.send(JSON.stringify({ message: 'missing file ' + file }));
		}
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
	} else {
		res.statusCode = 500;
		res.send(`{"error":"internal server error"}`)
	}
});

app.post("/login", (req, res) => {
	console.log('called login');
	res.status = 200;
	res.send({
		msg: "Your Access Token was successfully validated!"
	});
});


app.post("/move", async (req, res) => {
	const source = req.body.content.itemToMove;
	const target = req.body.content.targetFolder;

	let i = 0;
	for (let index in source) {
		let splittedItemName = source[index].name.split('/');
		let itemName = splittedItemName.pop();

		fs.renameSync(source[index].name, target + '/' + itemName);
	}

	res.statusCode = 200;
	res.send(JSON.stringify({ message: "moving succesful" }));
});


app.post('/rename', (req, res) => {
	console.log(`renaming ${req.body.content.oldName} to ${req.body.content.newName}`);

	let source = './external/' + req.body.content.oldName;
	let target = './external/' + req.body.content.newName

	fs.renameSync(source, target);

	res.statusCode = 200;
	res.send(JSON.stringify({ message: 'naming successfully' }));
})


let uploadCalled = 0;
app.post("/upload", (req, res) => {
	const uploadedFile = req.files.file;

	try {
		uploadedFile.mv(`./external/${req.files.file.name}`);
	} catch (e) {
		res.status = 500;
		res.send(JSON.stringify({ message: e.message }))
	}

	res.statusCode = 200;
	res.send("1234");
});

const server = https.createServer(httpsOptions, app).listen(5000, "0.0.0.0", function () {
	const host = server.address().address;
	const port = server.address().port;

	fs.existsSync('./external') ? null : fs.mkdirSync('./external');
	fs.existsSync('./internal') ? null : fs.mkdirSync('./internal');

	console.log(`Example app listening at https://${host}:${port}`);
});
