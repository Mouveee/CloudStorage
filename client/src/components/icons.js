import React from "react";
import "path";
import fileIcon from "../img/file.svg";
import folderIcon from "../img/folder.svg";
import headphones from "../img/headphones.svg";
import octopus from "../img/baby-octopus.jpg";
import photoIcon from "../img/photo.svg";
import trashcan from "../img/trashcan.svg";
import waitIcon from "../img/wait.gif";

function Icon(props) {
	let icon;
	switch (icon) {
		case "trashcan":
			icon = trashcan;
			break;
		default:
			icon = ".../img/photo.svg";
	}
	return icon;
}

export default Icon;
