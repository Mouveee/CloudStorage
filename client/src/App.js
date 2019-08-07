import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";

//custom components, hopefully well written
import Avatar from "./components/avatar.js";
import ControlFooter from "./components/ControlFooter.js";
import ControlHeader from "./components/ControlHeader.js";

import downloadIcon from "./img/download.svg";
import trashcan from "./img/trashcan.svg";
import folderIcon from "./img/folder.svg";
import fileIcon from "./img/file.svg";
import headphones from "./img/headphones.svg";
import photoIcon from "./img/photo.svg";
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

		if (response.status !== 200) {
			throw new Error(response.message);
		}

		return bodyPromise;
	};

	createFolder = async inputFolder => {
		const folder = this.state.currentFolder + inputFolder.value;

		if (folder.length > 0) {
			let response = this.callBackendAPI(folder, "/createfolder");
			console.log(`server respondes with status: ${response.status}`);
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

	getFileIcon(ending) {
		let returnValue = fileIcon;
		console.log(`file ending: ${ending}`);
		switch (ending) {
			case "ogg":
			case "flac":
			case "mp3":
			case "wav":
				returnValue = headphones;
				break;
			case "jpg":
			case "svg":
				returnValue = photoIcon;
				break;
			default:
				returnValue = fileIcon;
				break;
		}
		return returnValue;
	}

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
		item = item
			.replace(/\[/g, "")
			.replace(/"/g, "")
			.replace(/\]/g, "")
			.replace(/\//g, "");
		return item;
	};

	requestFolder = folder => {
		// Call our fetch function below once the component mounts
		let targetFolder = "./external/";
		folder ? (targetFolder += folder) : console.log(`sending ${targetFolder}`);
		this.setState({ updating: true });

		this.callBackendAPI(targetFolder)
			.then(res => {
				console.log(`res.data: ${res.status}`);

				let folders = JSON.parse(res.folders);

				this.setState({ updating: false });

				folders = folders.map(item => {
					item = this.normalizeItem(item);
					return item;
				});

				let files = JSON.parse(res.files);

				files = files.map(item => {
					item = this.normalizeItem(item);
					return item;
				});

				this.setState({ folderList: folders });
				this.setState({ fileList: files });
			})
			.catch(err => console.log(`error in catch: ${err}`));
	};

	sortBy = e => {
		console.log(`sorting by ${e.target.dataset.sort}`);
		console.log(`state: ${this.state.fileList}`);
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

	handleFolderClick = e => {
		let prev = [...this.state.prevFolder, this.state.currentFolder];

		this.setState({
			currentFolder: this.state.currentFolder + e.target.textContent + "/",
			prevFolder: prev,
			selectedItems: []
		});

		this.requestFolder(this.state.currentFolder + e.target.textContent);
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

	handleFileClick = async e => {
		let fileName = "unknown.dat";
		let message = document.createElement("p");
		message.innerText = "DOWNLOAD STARTED, PATIENCE PLEASE";
		let domNode = document.getElementById("App-info");
		domNode.append(message);

		setTimeout(() => {
			domNode.removeChild(message);
		}, 2000);

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
				<header className='App-header'>
					<h1 className='App-title'>
						<Avatar />
						OKTODRIVE <em>...praise the octopus baby...</em>
					</h1>

					<ControlHeader
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
									<tbody>
										{this.state.folderList.map((item, index) => {
											return (
												<tr key={"tr-folder-" + index}>
													<td className='App-smallSpan' />
													<td className='App-smallSpan'>
														<img
															src={folderIcon}
															className='App-listIconNonClickable'
															alt=''
														/>
													</td>
													<td
														onClick={this.handleFolderClick}
														className='App-listItem App-bigSpan'
														key={item}
													>
														{item}
													</td>
													<td className='App-smallSpan'>
														<img
															src={trashcan}
															className='App-listIcon'
															onClick={this.deleteItem}
															data-item={item}
															data-type='folder'
															alt='KILL'
														/>
													</td>
												</tr>
											);
										})}
										{this.state.fileList.map((item, index) => {
											let fileSplit = item.split(".");
											const fileEnding = fileSplit.pop();
											return (
												<tr key={"tr-file-" + index}>
													<td className='App-smallSpan'>
														<input
															type='checkbox'
															data-item={item}
															onChange={this.itemSelect}
														/>
													</td>
													<td className='App-smallSpan '>
														<img
															src={this.getFileIcon(fileEnding)}
															alt=''
															className='App-listIconNonClickable'
														/>
													</td>
													<td
														className='App-listItem App-bigSpan'
														onClick={this.handleFileClick}
														key={item}
													>
														{item}
													</td>
													<td className='App-smallSpan'>
														<img
															className='App-listIcon'
															src={trashcan}
															onClick={this.deleteItem}
															data-item={item}
															data-type='file'
															alt='KILL'
														/>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							);
						} else {
							return <div>This folder is empty :(</div>;
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
