import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import posed from 'react-pose';

//custom components, hopefully well written
import ControlFooter from "./components/ControlFooter.js";
import Header from "./components/Header.js";
import ListItem from "./components/ListItem.js";
import SideBar from "./components/Sidebar.js";
import StatusOverlay from "./components/StatusOverlay.js"

import waitIcon from "./img/wait.gif";
import "./App.css";

const MainTable = posed.table();

class App extends Component {
	constructor(props) {
		super(props);

		//toggles FilePond Menus visibility
		this.changeUploadVisibility.bind(this);

		//sets the file being dragged to parents state
		this.setFileBeingDragged.bind(this);
	}

	state = {
		currentFolder: "",
		prevFolder: [],
		fileList: [],
		fileBeingDragged: '',
		folderList: [],
		selectedItems: [],
		sorting: "name", //possible so far: 'name',
		statusOverlayVisible: false,
		statusOverlayMessage: 'Please Wait...',
		updating: false,
		uploadMenuVisible: false,
		//TODO factorize the whole table
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

		// const bodyPromise = await response.json();

		return response;
	};

	changeUploadVisibility = () => {
		this.setState({ uploadMenuVisible: !this.state.uploadMenuVisible });
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

	downloadFolder = async folder => {
		const content = {};
		content.folder = folder;

		let res = await this.callBackendAPI(content, '/downloadFolder');
		console.log(`resposne.status : ${res.status}`)
	}

	handleFileClick = async e => {
		let fileToDownload;

		typeof e === "string"
			? (fileToDownload = e)
			: (fileToDownload = e.target.textContent);

		let fileName = "unknown.dat";
		alert("this must get better...");

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
					file: fileToDownload
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
				//Append to html page
				document.body.appendChild(link);
				//Force download
				link.click();
				//Clean up and remove the link
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

	renameItem = item => {
		console.log('renaming item ' + item);


		let newName = prompt('Enter the new name', item);

		const content = {};
		content.itemToMove = item;
		content.targetFolder = this.state.currentFolder + newName;

		this.callBackendAPI(content, '/move')
	}

	requestFolder = async folder => {
		// Call our fetch function below once the component mounts
		let targetFolder = "./external/";
		folder ? (targetFolder += folder) : console.log(`sending ${targetFolder}`);
		this.setState({ updating: true });

		let response = await this.callBackendAPI(targetFolder);
		console.log(
			`response status: ${response.status}\nresponse type: ${typeof response}`
		);

		let parsedResponse = response.json();

		parsedResponse
			.then(res => {
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

	setFileBeingDragged = fileName => {
		console.log(`setting dragged file name to ${fileName}`);
		this.setState({ fileBeingDragged: fileName });
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
		this.setState({ uploadMenuVisible: !this.state.uploadMenuVisible });
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
		document.title = 'Octodrive';

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
		window.chrome ? console.log('Running on chrome...') : console.log('');

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
					{this.state.statusOverlayVisible ?
						<StatusOverlay
							message={this.state.statusOverlayMessage}
						/>
						: null
					}
					{this.state.uploadMenuVisible ? (
						<FilePond
							allowMultiple={true}
							name={"file"}
							server={"./upload"}
							className='App-filePond'
							oninit={() => { alert('right event triggered') }}
							onprocessfiles={() => {
								this.setState({ uploadMenuVisible: false });
								this.requestFolder(this.state.currentFolder);
							}
							}
						/>
					) : null}

					<SideBar />;

					{(() => {
						if (this.state.updating) {
							return (
								<div id='App-folderList'>
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
									<thead id='App-tableHead' >
										<tr >
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
												key={'li-' + index}
												actualize={this.actualize}
												callBackendAPI={this.callBackendAPI}
												currentFolder={this.state.currentFolder}
												downloadFolder={this.downloadFolder}
												item={item}
												index={index}
												deleteItem={this.deleteItem}
												fileBeingDragged={this.state.fileBeingDragged}
												handleClick={this.handleFolderClick}
												renameItem={this.renameItem}
												setFileBeingDragged={this.setFileBeingDragged}
												type='folder'
											/>
										);
									})}
									{this.state.fileList.map((item, index) => {
										let fileSplit = item.name.split(".");
										const fileEnding = fileSplit.pop();
										return (
											<ListItem
												key={'li-' + index}
												actualize={this.actualize}
												callBackendAPI={this.callBackendAPI}
												currentFolder={this.state.currentFolder}
												item={item}
												index={index}
												deleteItem={this.deleteItem}
												fileBeingDragged={this.state.fileBeingDragged}
												fileEnding={fileEnding}
												handleClick={this.handleFileClick}
												itemSelect={this.itemSelect}
												renameItem={this.renameItem}
												setFileBeingDragged={this.setFileBeingDragged}
												type='file'
											/>
										);
									})}
								</table>
							);
						} else {
							return (
								<div id='App-folderList'>
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

					<ControlFooter
						uploadFile={this.uploadFile}
						itemsSelected={this.state.selectedItems.length > 0 ? true : false}
					/>
				</section>
				<br />
			</div>
		);
	}
}

export default App;
