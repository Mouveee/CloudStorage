import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";

//custom components, hopefully well written
import ControlFooter from "./components/ControlFooter.js";
import Header from "./components/Header.js";
import ListItem from "./components/ListItem.js";

import waitIcon from "./img/wait.gif";
import "./App.css";

class App extends Component {
	state = {
		currentFolder: "",
		prevFolder: [],
		fileList: [],
		folderList: [],
		selectedItems: [],
		updating: false,
		sorting: "name" //possible so far: 'name',
	};

	actualize = () => {
		this.requestFolder(this.state.currentFolder);
	};

	callBackendAPI = async (content, destination) => {
		let requestBody = {};
		requestBody.content = content;

		if (!destination) destination = "./external";

		const response = await fetch(destination, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, cors, *same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": `application/json`,
				Accept: "*/*"
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrer: "no-referrer", // no-referrer, *client
			body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
		});

		const bodyPromise = await response.json();

		return bodyPromise;
	};

	createFolder = async inputFolder => {
		const folder = this.state.currentFolder + inputFolder.value;

		if (folder.length > 0) {
			let response = this.callBackendAPI(folder, "/createfolder");
			console.log(`response: ${JSON.stringify(response)}`);
			this.requestFolder(this.state.currentFolder);
			inputFolder.value = "";
		}
	};

	deleteItem = async item => {
		const content = {};
		let confirmed = false;

		content.item = item.target.dataset.item;
		content.type = item.target.dataset.type;
		content.location = this.state.currentFolder;

		confirmed = window.confirm(`really delete ${content.item}?`);

		if (confirmed) {
			this.setState({ updating: true });

			this.callBackendAPI(content, "/delete");

			this.setState({ updating: false });

			this.actualize();
		}
	};

	handleFileClick = async e => {
		let fileName = "unknown.dat";
		alert ('this must get better...')

		new Promise(async (resolve, reject) => {
			let answer = await fetch("/download", {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors", // no-cors, cors, *same-origin
				cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*"
					// 'Content-Type': 'application/x                                                                                                   -www-form-urlencoded',
				},
				redirect: "follow", // manual, *follow, error
				referrer: "no-referrer", // no-referrer, *client
				body: JSON.stringify({
					folder: this.state.currentFolder,
					file: e.target.textContent
				}) // body data type must match "Content-Type" header
			});

			if (answer.headers.get("File")) {
				resolve(answer);
			} else {
				reject("this is not good :( REJECTED");
			}
		})
			.then(response => {
				fileName = response.headers.get("File");
				return response.blob();
			})
			.then(blob => {
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", fileName);
				// 3. Append to html page
				document.body.appendChild(link);
				// 4. Force download
				link.click();
				// 5. Clean up and remove the link
				link.parentNode.removeChild(link);
			})
			.catch(e => {
				console.log(`error in promise: ${e}`);
			});
	};

	handleFolderClick = e => {
		let prev = [...this.state.prevFolder, this.state.currentFolder];

		this.setState({
			currentFolder: this.state.currentFolder + e.target.textContent + "/",
			prevFolder: prev,
			selectedItems: []
		});

		this.requestFolder(this.state.currentFolder + e.target.textContent);
	};

	itemSelect = async e => {
		const item = e.target.dataset.item;
		if (e.target.checked) {
			await this.setState({
				selectedItems: [...this.state.selectedItems, item]
			});
		} else {
			await this.setState({
				selectedItems: this.state.selectedItems.filter((i, index) => {
					return i !== item;
				})
			});
		}
	};

	normalizeItem = item => {
		item = item.replace(/"/g, "").replace(/\//g, "");
		return item;
	};

	requestFolder = folder => {
		// Call our fetch function below once the component mounts
		let targetFolder = "./external/";
		folder ? (targetFolder += folder) : console.log(`sending ${targetFolder}`);
		this.setState({ updating: true });

		let response = this.callBackendAPI(targetFolder);
		console.log(`response status: ${response.statusCode}`);

		response
			.then(res => {
				console.log(`typeof res: ${JSON.stringify(res)}`);

				let folders = JSON.parse(res.folders);

				this.setState({ updating: false });

				folders = folders.map(item => {
					item.name = this.normalizeItem(item.name);
					return item;
				});

				let files = JSON.parse(res.files);

				files = files.map(item => {
					item.name = this.normalizeItem(item.name);
					return item;
				});

				this.setState({ folderList: folders });
				this.setState({ fileList: files });
			})
			.catch(err => console.log(`error in catch: ${err}`));
	};

	sortBy = e => {
		let newFolderList = [];
		let newFileList = [];

		switch (e.target.dataset.sort) {
			case "name":
				newFolderList = this.state.folderList.reverse();
				newFileList = this.state.fileList.reverse();
				this.setState({
					sorting: e.target.dataset.sort,
					folderList: newFolderList,
					fileList: newFileList
				});
				break;

			default:
				return;
		}
	};

	uploadFile = () => {
		alert("soon this will work...");
	};

	navigateBack = () => {
		if (this.state.prevFolder.length > 0) {
			let folder = this.state.prevFolder[this.state.prevFolder.length - 1];
			let prevFolder = new Array(...this.state.prevFolder);

			prevFolder.pop();

			this.setState({
				currentFolder: folder,
				prevFolder: prevFolder,
				selectedItems: []
			});

			this.requestFolder(folder);
		}
	};

	componentDidMount() {
		const inputFolder = document.getElementById("App-folderInput");
		this.requestFolder();

		//create a folder by pressing return, remove event listener when unfocused
		inputFolder.onfocus = () =>
			(document.onkeypress = e => {
				if (e.keyCode === 13) {
					e.preventDefault();
					this.createFolder(inputFolder);
				}
			});

		inputFolder.onblur = () => (document.onkeypress = null);
	}

	render() {
		return (
			<div className='App'>
				<header>
					<Header
						currentFolder={this.state.currentFolder}
						navigateBack={this.navigateBack}
						actualize={this.actualize}
						root={this.state.currentFolder === "" ? true : false}
					/>
				</header>

				<section id='App-container'>
					{(() => {
						if (this.state.updating) {
							return (
								<div>
									<img src={waitIcon} alt='loading...' />
								</div>
							);
						} else if (
							!(
								this.state.folderList.length === 0 &&
								this.state.fileList.length === 0
							)
						) {
							return (
								<table id='App-folderList'>
									<thead>
										<tr>
											<th />
											<th />
											<th
												className='App-columnName'
												onClick={this.sortBy}
												data-sort='name'
											>
												Name
											</th>
										</tr>
									</thead>
									{this.state.folderList.map((item, index) => {
										return (
											<ListItem
												item={item}
												index={index}
												deleteItem={this.deleteItem}
												handleClick={this.handleFolderClick}
												type='folder'
											/>
										);
									})}
									{this.state.fileList.map((item, index) => {
										let fileSplit = item.name.split(".");
										const fileEnding = fileSplit.pop();
										return (
											<ListItem
												item={item}
												index={index}
												deleteItem={this.deleteItem}
												fileEnding={fileEnding}
												handleClick={this.handleFileClick}
												itemSelect={this.itemSelect}
												type='file'
											/>
										);
									})}
								</table>
							);
						} else {
							return (
								<div>
									This folder is empty :(
									<br />
									<a
										href='http://www.assoass.com'
										target='_blank'
										rel='noopener noreferrer'
									>
										WATCH PORN INSTEAD!
									</a>
								</div>
							);
						}
					})()}
					<ControlFooter uploadFile={this.uploadFile} />
				</section>
				<br />
			</div>
		);
	}
}

export default App;
