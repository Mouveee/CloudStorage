import React from "react";

import trashcan from "../img/trashcan.svg";
import downloadIcon from "../img/download.svg";
import folderIcon from "../img/folder.svg";
import fileIcon from "../img/file.svg";
import headphones from "../img/headphones.svg";
import photoIcon from "../img/photo.svg";

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

function ListItem(props) {
	console.log(`typeof modified: ${typeof Date(props.item.modified)}`);
	return (
		<tbody>
			<tr key={"tr-" + props.type + "-" + props.index}>
				{props.type === "folder" ? (
					<td className='App-smallSpan' />
				) : (
					<td>
						<input
							type='checkbox'
							data-item={props.item.name}
							onChange={props.itemSelect}
						/>
					</td>
				)}
				<td className='App-smallSpan'>
					<img
						src={
							props.type === "folder"
								? folderIcon
								: getFileIcon(props.fileEnding)
						}
						className='App-listIconNonClickable'
						alt=''
					/>
				</td>
				<td
					onClick={props.handleClick}
					className='App-listItem App-bigSpan'
					key={props.item.name}
				>
					{props.item.name}
				</td>
				<td className='App-smallSpan'>
					<img
						src={downloadIcon}
						className='App-listIcon'
						data-item={props.item.name}
						data-type={props.type}
						alt='KILL'
					/>
				</td>
				<td className='App-smallSpan'>
					<img
						src={trashcan}
						className='App-listIcon'
						onClick={props.deleteItem}
						data-item={props.item.name}
						data-type={props.type}
						alt='KILL'
					/>
				</td>
			</tr>
			{props.type === "file" ? (
				<tr className='App-itemInfo'>
					<td />
					<td />
					<td className='App-itemInfo'>
						{Math.round(props.item.size / 1048576, 4) +
							" mb" +
							" " +
							formatDate(props.item.modified)}
					</td>
					<td />
					<td />
					<td />
				</tr>
			) : (
				<tr className='App-itemInfo'>
					<td />
					<td />
					<td className='App-itemInfo'>
						Folder {formatDate(props.item.modified)}
					</td>
					<td />
					<td />
					<td />
				</tr>
			)}
		</tbody>
	);
}

export default ListItem;
