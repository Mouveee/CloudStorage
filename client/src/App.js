import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import MobileDetect from 'mobile-detect';
import posed from 'react-pose';

//custom components, hopefully well written
import ControlFooter from "./components/ControlFooter.js";
import Header from "./components/Header.js";
import ListItem from "./components/ListItem.js";
import ProgressIndicator from './components/ProgressIndicator.js';
import SideBar from "./components/Sidebar.js";
import StatusOverlay from "./components/StatusOverlay.js";
import TableHead from './components/TableHead.js';
import WaitingScreen from './components/WaitingScreen.js';

import waitIcon from "./img/wait.gif";
import "./App.css";

const MainTable = posed.table();

class App extends Component {
	constructor(props) {
		super(props);

		//toggles FilePond Menus visibility
		this.changeUploadVisibility.bind(this);

		//clears selected item array after moving of multiple files
		this.clearSelectedItems.bind(this);

		//sets the file being dragged to parents state
		this.setFileBeingDragged.bind(this);

		this.sortBy.bind(this);

		this.state = {
			currentFolder: "./",
			prevFolder: [],
			fileList: [],
			fileBeingDragged: '',
			folderList: [],
			inProgress: [],
			selectedItems: [],
			sorting: "name", //possible so far: 'name',
			statusOverlayVisible: false,
			statusOverlayMessage: 'Please Wait...',
			updating: false,
			uploadMenuVisible: false,
			//TODO factorize the whole table
		};
	}

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

		return response;
	};

	changeUploadVisibility = () => {
		this.setState({ uploadMenuVisible: !this.state.uploadMenuVisible });
	};

	clearSelectedItems = () => {
		this.setState({ selectedItems: [] })
	}

	createFolder = async inputFolder => {
		const folder = this.state.currentFolder + inputFolder.value;

		if (folder.length > 0) {
			let response = this.callBackendAPI(folder, "/createfolder");
			console.log(`response: ${JSON.stringify(response)}`);
			this.requestFolder(this.state.currentFolder);
			inputFolder.value = "";
		}
	};

	deleteItem = async (name, type, confirmed) => {
		const content = {};

		content.item = name;
		content.type = type;
		content.location = this.state.currentFolder;

		confirmed = confirmed ? true : window.confirm(`really delete ${content.item}?`);

		if (confirmed) {
			this.setState({ updating: true });

			this.callBackendAPI(content, "/delete");

			this.setState({ updating: false });

			this.actualize();
		}
	};

	deleteMultipleItems = items => {
		const confirmed = window.confirm(`Delete ${this.state.selectedItems.length} files?`);

		if (confirmed) {
			this.setState({ actualize: true })
			items.map(item => this.deleteItem(item.name, item.type, true))
			this.setState({ actualize: false, selectedItems: [] })
		}
	};

	downloadFolder = async folder => {
		const content = {};
		content.folder = folder;

		this.setState({ inProgress: [...this.state.inProgress, 'zipping your folder'] })

		let res = await this.callBackendAPI(content, '/downloadFolder');
		console.log(`response.status : ${res.status}`);

		res.json().then(response => {
			this.setState({ inProgress: [] });
			console.log(`zipping success, progress should disappear...`)
		})
	}

	handleFileClick = async e => {
		let fileToDownload;

		typeof e === "string"
			? (fileToDownload = e)
			: (fileToDownload = e.target.textContent);

		let fileName = "unknown.dat";
		this.setState({ inProgress: [...this.state.inProgress, 'downLoading'] })

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
				this.setState({ inProgress: [] })
			})
			.catch(e => {
				console.log(`error in promise: ${e}`);
			});
	};

	handleFolderClick = e => {
		let prev = [...this.state.prevFolder, this.state.currentFolder]

		this.setState({
			currentFolder: this.state.currentFolder + e.target.textContent + "/",
			prevFolder: prev,
			selectedItems: []
		});

		this.requestFolder(this.state.currentFolder + e.target.textContent);
	};

	itemSelect = async (e, name, type) => {
		const item = {}

		item.name = name;
		item.type = type;

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

	navigateBack = async () => {
		if (this.state.prevFolder.length > 0) {
			let prevFolder = [...this.state.prevFolder];
			prevFolder.pop();

			await this.setState({
				currentFolder: this.state.prevFolder[this.state.prevFolder.length - 1],
				prevFolder: prevFolder,
				selectedItems: []
			});

			this.actualize();
		}
	};

	normalizeItem = item => {
		item = item.replace(/"/g, "").replace(/\//g, "");
		return item;
	};

	renameItem = async item => {
		console.log('renaming item ' + item);

		let newName = prompt('Enter the new name', item);

		const content = {};
		content.oldName = this.state.currentFolder + item;
		content.newName = this.state.currentFolder + newName;

		let answer = await this.callBackendAPI(content, '/rename');

		answer.status === 200 ?
			this.actualize()
			: console.log('something went wrong, server status: ' + answer.status);
	}

	requestFolder = async folder => {
		let targetFolder = "./external/";
		folder ? (targetFolder += folder.slice(2)) : console.log(`sending ${targetFolder}`);
		this.setState({ updating: true });

		console.log('requested folder folder sliced: ' + folder.slice(2))

		let response = await this.callBackendAPI(targetFolder, '/external');

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
					fileList: [],
					folderList: []
				})

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


	componentDidMount() {
		document.title = 'Octodrive';

		const inputFolder = document.getElementById("App-folderInput");
		this.requestFolder(this.state.currentFolder);

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
		// window.chrome ? console.log('Running on chrome...') : console.log('');

		const md = new MobileDetect(
			window.navigator.userAgent
		);

		// more typically we would instantiate with 'window.navigator.userAgent'
		// as user-agent; this string literal is only for better understanding

		// console.log(md.mobile() ? 'running on mobile ' + md.mobile() : 'no mobile');          // 'Sony'
		// console.log(md.phone() ? 'phone type: ' + md.phone() : 'this is not a telephone');           // 'Sony'
		// console.log(md.tablet());          // null
		// console.log(md.userAgent());       // 'Safari'
		// console.log(md.os() ? 'os: ' + md.os() : `couldn't determine os...`);              // 'AndroidOS'
		// console.log(md.is('iPhone'));      // false
		// console.log(md.is('bot'));         // false
		// console.log(md.version('Webkit'));         // 534.3
		// console.log(md.versionStr('Build'));       // '4.1.A.0.562'
		// console.log(md.match('playstation|xbox')); // false

		return (

			< div className='App' >
				<header>
					<Header
						currentFolder={this.state.currentFolder}
						isMobile={md.phone() ? true : false}
						navigateBack={this.navigateBack}
						actualize={this.actualize}
						root={this.state.currentFolder === "./" ? true : false}
					/>
				</header>

				<section id='App-container'>
					{this.state.inProgress.length > 0 ?
						<ProgressIndicator message={this.state.inProgress[this.state.inProgress.length - 1]} />
						: null
					}

					{/* TODO: everything */}
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
							oninit={() => { console.log('right event triggered, create an overlay TODO') }}
							onprocessfiles={() => {
								this.setState({ uploadMenuVisible: false });
								this.requestFolder(this.state.currentFolder);
							}
							}
						/>
					) : null}

					{!md.mobile() ?
						<SideBar />
						: null
					}

					{(() => {
						if (this.state.updating) {
							return (
								<WaitingScreen
									waitIcon={waitIcon}
								/>
							);
						} else if (
							!(
								this.state.folderList.length === 0 &&
								this.state.fileList.length === 0
							)
						) {
							return (
								<table id='App-folderList' className={md.phone() ? 'folderListMobile' : 'folderListBig'}>
									<TableHead
										actualize={this.actualize}
										callBackendAPI={this.callBackendAPI}
										clearSelectedItems={this.clearSelectedItems}
										currentFolder={this.state.currentFolder}
										fileBeingDragged={this.state.fileBeingDragged}
										isMobile={md.phone() ? true : false}
										prevFolder={this.state.prevFolder}
										selectedItems={this.state.selectedItems}
										setFileBeingDragged={this.setFileBeingDragged}
										sortBy={this.sortBy}
										navigateBack={this.navigateBack}
										root={this.state.currentFolder === "./" ? true : false}
									/>

									{this.state.folderList.map((item, index) => {
										return (
											<ListItem
												key={'li-' + index}
												actualize={this.actualize}
												callBackendAPI={this.callBackendAPI}
												clearSelectedItems={this.clearSelectedItems}
												currentFolder={this.state.currentFolder}
												downloadFolder={this.downloadFolder}
												item={item}
												index={index}
												isMobile={md.phone() ? true : false}
												deleteItem={this.deleteItem}
												fileBeingDragged={this.state.fileBeingDragged}
												handleClick={this.handleFolderClick}
												renameItem={this.renameItem}
												selectedItems={this.state.selectedItems}
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
												clearSelectedItems={this.clearSelectedItems}
												currentFolder={this.state.currentFolder}
												item={item}
												index={index}
												deleteItem={this.deleteItem}
												fileBeingDragged={this.state.fileBeingDragged}
												fileEnding={fileEnding}
												handleClick={this.handleFileClick}
												isMobile={md.phone() ? true : false}
												itemSelect={this.itemSelect}
												renameItem={this.renameItem}
												selectedItems={this.state.selectedItems}
												setFileBeingDragged={this.setFileBeingDragged}
												type='file'
											/>
										);
									})}
								</table>
							);
						} else {
							return (
								<table id='App-folderList'>
									<TableHead
										actualize={this.actualize}
										callBackendAPI={this.callBackendAPI}
										currentFolder={this.state.currentFolder}
										fileBeingDragged={this.state.fileBeingDragged}
										prevFolder={this.state.prevFolder}
										setFileBeingDragged={this.setFileBeingDragged}
										sortBy={this.sortBy}
										navigateBack={this.navigateBack}
										root={this.state.currentFolder === "./" ? true : false}
									/>
									<tbody>
										<tr>
											<td />
											<td>this folder is empty...</td>
											<td>
												<a
													href='http://www.assoass.com'
													target='_blank'
													rel='noopener noreferrer'
												>
													WATCH PORN INSTEAD!
											</a>
											</td>
										</tr>
									</tbody>
								</table>
							);
						}
					})()}

					<ControlFooter
						deleteMultipleItems={this.deleteMultipleItems}
						isMobile={md.phone() ? true : false}
						selectedItems={this.state.selectedItems}
						updating={this.state.updating}
						uploadFile={this.uploadFile}
					/>
				</section>
				<br />
			</div >
		);
	}
}

export default App;
