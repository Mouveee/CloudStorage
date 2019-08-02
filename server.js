require("dotenv").config();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const upload = require("./upload");
const zip = require("express-zip");
const https = require("https");
const rimraf = require("rimraf");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "external")));

function getFolderContent(folder) {
	let objectToSend = {};
	let dirContent = fs.readdirSync(`${folder}`);
	let files = [];
	let folders = [];

	dirContent.map(object => {
		fs.statSync(folder + "/" + object).isDirectory()
			? folders.push(object)
			: files.push(object);
	});

	objectToSend.files = JSON.stringify(files);
	objectToSend.folders = JSON.stringify(folders);

	return objectToSend;
}

app.post("/download", async function(req, res) {
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
			res.send(JSON.toString({ error: "error :(" }));
		});
});

app.post("/upload", upload);

app.post("/createfolder", (req, res) => {
	let objectToSend = {};

	console.log(
		`${process.env.DOTS}\nsomebody wants me to create folder ./external/${
			req.body.content
		}`
	);
	if (req.body.content && !fs.existsSync(`./external/${req.body.content}`)) {
		fs.mkdirSync(`./external/${req.body.content}`);
		objectToSend = getFolderContent(`./external/` + req.body.content);
	}

	res.send(JSON.stringify(objectToSend));
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
	}
});

//list file content
app.post("/external", (req, res) => {
	let objectToSend = {};
	let dir = req.body.content || "./external/";

	console.log(process.env.DOTS);
	console.log(`received POST request with params: ${req.body.content}`);
	console.log(`scanning for dir:  ${dir}`);

	objectToSend = getFolderContent(dir);

	res.send(JSON.stringify(objectToSend));
});

const server = app.listen(5000, "127.0.0.1", function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log(`Example app listening at http://${host}:${port}`);
});
