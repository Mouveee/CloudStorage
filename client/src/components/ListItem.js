import React from "react";

import posed, { PoseGroup } from 'react-pose';

import trashcan from "../img/trashcan.svg";
import downloadIcon from "../img/download.svg";
import folderIcon from "../img/folder.svg";
import fileIcon from "../img/file.svg";
import headphones from "../img/headphones.svg";
import photoIcon from "../img/photo.svg";

import "./ListItem.css";

//TODO: make this useful
const TableRow = posed.tr(
	{
		enter: { opacity: 1, delay: 300 },
		exit: { opacity: 0 },
	});


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

class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fileBeingDragged: "",
			visible: false
		};
	}

	render() {
		let i = this.props.index * 1000;

		return (
			<tbody key={'body- ' + i++}>
				<PoseGroup>
					<tr
						key={"tr-" + this.props.type + "-" + i}
						draggable="true"
						onDragStart={e => {
							// e.preventDefault();

							e.dataTransfer.setData('text/plain', 'assoass');

							// e.stopPropagation();
							this.props.setFileBeingDragged(this.props.item.name);
							console.log(
								"you dragged an item of name " + this.props.fileBeingDragged
							);
						}}
						onDragOver={e => {
							e.preventDefault();

							if (this.props.type === 'folder' && this.props.fileBeingDragged !== this.props.item.name) {
								e.target.style.backgroundColor = "pink";
							}
							e.preventDefault();
						}}
						onDragLeave={e => {
							e.preventDefault();
							e.target.style.backgroundColor = "white";
						}}
						onDrop={async e => {
							e.preventDefault();
							if (this.props.type === 'folder') {
								e.target.style.backgroundColor = "white";

								if (this.props.fileBeingDragged === this.props.item.name) {
									alert("Naming conflict you idiot");
								} else {
									const content = {};
									content.itemToMove = this.props.currentFolder + this.props.fileBeingDragged;
									content.targetFolder = this.props.currentFolder + this.props.item.name;

									console.log(`JSON: ${JSON.stringify(content)}`)

									this.props.setFileBeingDragged({ fileBeingDragged: "" });
									let responsePromise = await this.props.callBackendAPI(
										content,
										"/move"
									);
									const response = responsePromise.json();
									response.then(resolved => this.props.actualize());
								}
							}
						}}
					>
						{this.props.type === "folder" ? (
							<td className='App-smallSpan' />
						) : (
								<td key={'td- ' + i++}>
									<input
										type='checkbox'
										data-item={this.props.item.name}
										onChange={this.props.itemSelect}
									/>
								</td>
							)}
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
							onClick={this.props.handleClick}
							className='App-listItem App-bigSpan'
							key={this.props.item.name}
						>
							{this.props.item.name}
						</td>
						<td className='App-smallSpan' key={'td- ' + i++}>
							<img
								key={'td- ' + i++}
								src={downloadIcon}
								className='App-listIcon'
								data-item={this.props.item.name}
								data-type={this.props.type}
								onClick={
									this.props.type === "file"
										? () => {
											this.props.handleClick(this.props.item.name);
										}
										: () => {
											this.props.downloadFolder(this.props.currentFolder + this.props.item.name);
										}
								}
								alt='KILL'
							/>
						</td>
						<td className='App-smallSpan' key={'td- ' + i++}>
							<img
								src={trashcan}
								className='App-listIcon'
								onClick={this.props.deleteItem}
								data-item={this.props.item.name}
								data-type={this.props.type}
								alt='KILL'
							/>
						</td>
					</tr>
					{this.props.type === "file" ? (
						<tr key={"tr-" + this.props.type + "-" + this.props.index}
							className='App-itemInfo'
						>
							<td key={'td- ' + i++} />
							<td key={'td- ' + i++} />
							<td className='App-itemInfo' key={'td- ' + i++}>
								{Math.round(this.props.item.size / 1048576, 4) +
									" mb" +
									" " +
									formatDate(this.props.item.modified)}
							</td>
							<td key={'td- ' + i++} />
							<td key={'td- ' + i++} />
							<td key={'td- ' + i++} />
						</tr>
					) : (
							<tr className='App-itemInfo'
								key={"tr-sub-" + this.props.type + "-" + this.props.index}>
								<td key={'td- ' + i++} />
								<td key={'td- ' + i++} />
								<td className='App-itemInfo'>
									Folder {formatDate(this.props.item.modified)}
								</td>
								<td key={'td- ' + i++} />
								<td key={'td- ' + i++} />
								<td key={'td- ' + i++} />
							</tr>
						)}
				</PoseGroup>
			</tbody>
		);
	}
}

export default ListItem;
