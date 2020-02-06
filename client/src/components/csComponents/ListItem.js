import React from "react";

import MobileButton from './MobileButton';

import cameraIcon from "../../img/camera.svg";
import trashcan from "../../img/trashcan.svg";
import downloadIcon from "../../img/download.svg";
import folderIcon from "../../img/folder.svg";
import fileIcon from "../../img/file.svg";
import headphones from "../../img/headphones.svg";
import penIcon from "../../img/pen.svg"
import photoIcon from "../../img/photo.svg";

import "./ListItem.css";

function formatDate(dateString) {
	const date = new Date(dateString);

	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const weekDay = date.getDay();

	return `|| modified: ${getWeekDay(weekDay)} ${day + 1}.${month + 1}.${year}`;
}

function getWeekDay(day) {
	let dayName;

	switch (day) {
		case 0:
			dayName = "Monday";
			break;
		case 1:
			dayName = "Tuesday";
			break;
		case 2:
			dayName = "Wednesday";
			break;
		case 3:
			dayName = "Thursday";
			break;
		case 4:
			dayName = "Friday";
			break;
		case 5:
			dayName = "Saturday";
			break;
		case 6:
			dayName = "Sunday";
			break;
		default:
			dayName = "your clock is fucked!";
			break;
	}
	return dayName;
}

function getFileIcon(ending) {
	let returnValue = fileIcon;

	switch (ending) {
		case "ogg":
		case "flac":
		case "mp3":
		case "wav":
			returnValue = headphones;
			break;
		case 'gif':
		case "jpg":
		case "jpeg":
		case "svg":
			returnValue = photoIcon;
			break;
		case 'avi':
		case 'mov':
		case 'mp4':
			returnValue = cameraIcon;
			break;
		default:
			returnValue = fileIcon;
			break;
	}
	return returnValue;
}

class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false //toggle by clicking on checkbox in first atble item
		};
	}

	onDragOver = e => {
		// e.preventDefault();

		if (this.props.type === 'folder' && this.props.fileBeingDragged !== this.props.item.name) {
			e.target.style.color = "pink";
		}

		e.preventDefault();
	}

	onDragLeave = e => {
		e.preventDefault();
		e.target.style.color = "gray";
	}

	onDragStart = e => {
		e.dataTransfer.setData('text/plain', 'assoass');

		let fileBeingDragged = {
			key: {
				name: './external/' + this.props.currentFolder.slice(2) + `${this.props.item.name}`,
				type: this.props.type
			}
		};

		this.props.setFileBeingDragged(fileBeingDragged);
	}

	onDrop = async e => {
		//TODO: make actualize screen visible shile moving folders

		e.preventDefault();

		if (this.props.type === 'folder') {
			e.target.style.color = "gray";

			if (this.props.fileBeingDragged.key.name === this.props.item.name || this.state.checked) {
				alert("Naming conflict");
			} else {
				const content = {};

				//check if multiple files are selected so they are sent as an array to the 'move' function in app.js
				if (Object.keys(this.props.selectedItems).length === 0) {
					content.itemToMove = this.props.fileBeingDragged
				} else {
					content.itemToMove = this.props.selectedItems;
				}

				content.targetFolder = './external/' + this.props.currentFolder.slice(2) + this.props.item.name;

				let responsePromise = await this.props.callBackendAPI(
					content,
					"/move"
				);
				const response = responsePromise.json();

				this.props.setFileBeingDragged({ fileBeingDragged: {} });
				this.props.clearSelectedItems();

				//reload folder
				response.then(resolved => this.props.actualize());
			}
		}
	}

	render() {
		let i = this.props.index * 1000;
		let classVisible = 'App-listBody';
		let classItemInfo = 'App-itemInfo';

		if (this.props.isMobile) {
			classVisible += ' App-liMobile';
			classItemInfo += ' App-liMobile';
		}

		return (
			<tbody key={'body- ' + i++} className={classVisible}>
				<tr
					key={"tr-" + this.props.type + "-" + i}
					draggable="true"
					onDragStart={e => this.onDragStart(e)}
					onDragOver={e => this.onDragOver(e)}
					onDragLeave={e => this.onDragLeave(e)}
					onDrop={e => this.onDrop(e)}
				>
					<td key={'td- ' + i++} className='App-smallSpan'>
						<label className="App-listBoxContainer">
							<input
								className="App-listCheckbox"
								type='checkbox'
								onChange={e => {
									this.props.itemSelect(e, this.props.item.name, this.props.type);
									this.setState({ checked: !this.state.checked })
								}}
								value={this.state.checked}
							/>
							<span className='App-listCustomCheckbox' />
						</label>
					</td>

					<td className='App-smallSpan' key={'td- ' + i++}>
						<img
							src={
								this.props.type === "folder"
									? folderIcon
									: getFileIcon(this.props.fileEnding)
							}
							className='App-listIconNonClickable'
							alt=''
						/>
					</td>

					<td
						onClick={e => {
							this.props.type === 'file' ?
								this.props.handleClick(this.props.item.name, './external/' + this.props.currentFolder.slice(2))
								: this.props.handleClick(e);
						}}
						className='App-listItem App-bigSpan'
						key={this.props.item.name}
					>
						{this.props.item.name}
					</td>

					{this.props.userRole === 'admin' ?
						!this.props.isMobile ?
							<td className='App-smallSpan' key={'td- ' + i++}>
								<img
									key={'td- ' + i++}
									src={penIcon}
									className='App-listIcon'
									data-item={this.props.item.name}
									data-type={this.props.type}
									onClick={() => this.props.renameItem(this.props.item.name)}
									alt='KILL'
								/>

								<img
									key={'td- ' + i++}
									src={downloadIcon}
									className='App-listIcon'
									data-item={this.props.item.name}
									data-type={this.props.type}
									onClick={
										this.props.type === "file"
											? () => {
												this.props.handleClick(this.props.item.name, './external/' + this.props.currentFolder.slice(2));
											}
											: () => {
												this.props.downloadFolder('./external/' + this.props.currentFolder.slice(2) + this.props.item.name);
											}
									}
									alt='KILL'
								/>

								<img
									src={trashcan}
									className='App-listIcon'
									onClick={() => {
										if (Object.keys(this.props.selectedItems).length > 0) {
											this.props.deleteItem(this.props.selectedItems)
										} else {
											let item = {};
											item.name = './external/' + this.props.currentFolder.slice(2) + this.props.item.name
											item.type = this.props.type;

											let container = {};
											container[this.props.item.name] = item;

											console.log(`composed: ${JSON.stringify(this.props.item)}`)

											this.props.deleteItem(container);
										}
									}}
									alt='KILL'
								/>
							</td> : <MobileButton />
						: <td><p></p></td>
					}

				</tr>
				{this.props.type === "file" ? (
					<tr key={"tr-" + this.props.type + "-" + this.props.index}
						className={classItemInfo}
					>
						<td key={'td- ' + i++} />
						<td key={'td- ' + i++} />
						<td className={classItemInfo} key={'td- ' + i++}>
							{Math.round((this.props.item.size / 1048576 * 100)) / 100 +
								" mb" +
								" " +
								formatDate(this.props.item.modified)}
						</td>
						<td key={'td- ' + i++} />
						<td key={'td- ' + i++} />
						<td key={'td- ' + i++} />
					</tr>
				) : (
						<tr className={classItemInfo}
							key={"tr-sub-" + this.props.type + "-" + this.props.index}>
							<td key={'td- ' + i++} />
							<td key={'td- ' + i++} />
							<td className={classItemInfo}>
								Folder {formatDate(this.props.item.modified)}
							</td>
							<td key={'td- ' + i++} />
							<td key={'td- ' + i++} />
							<td key={'td- ' + i++} />
						</tr>
					)}
			</tbody >
		);
	}
}

export default ListItem;
