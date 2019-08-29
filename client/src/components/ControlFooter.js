import React from "react";

import "./ControlFooter.scss";

import downloadIcon from "../img/download.svg";
import uploadIcon from "../img/upload.svg";

function ControlFooter(props) {
	return (
		<nav id='App-controlFooter'>
			{props.itemsSelected ? (
				<img src={downloadIcon} alt=':(' className='App-controlElement' />
			) : null}
			<img
				src={uploadIcon}
				alt=':('
				className='App-controlElement'
				onClick={props.uploadFile}
			/>
			<input
				id='App-folderInput'
				placeholder='create new folder...'
				className='App-controlElement'
			/>
		</nav>
	);
}

export default ControlFooter;
