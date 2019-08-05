import React from "react";

import "./ControlFooter.css";

import uploadIcon from "../img/upload.svg";

function ControlFooter(props) {
	return (
		<nav id='App-controlFooter'>
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
