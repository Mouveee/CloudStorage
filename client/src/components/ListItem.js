import React from "react";

import trashcan from "../img/trashcan.svg";
import folderIcon from "../img/folder.svg";
import fileIcon from "../img/file.svg";
import headphones from "../img/headphones.svg";
import photoIcon from "../img/photo.svg";

import "./ListItem.css";

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
							props.item.modified}
					</td>
					<td />
					<td />
				</tr>
			) : (
				<tr className='App-itemInfo'>
					<td />
					<td />
					<td className='App-itemInfo'>
						Download Folder {props.item.modified}
					</td>
					<td />
					<td />
				</tr>
			)}
		</tbody>
	);
}

export default ListItem;
