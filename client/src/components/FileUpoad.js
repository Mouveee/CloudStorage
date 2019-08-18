import React from "react";

import closeIcon from "../img/close.svg";

import "./FileUpload.css";

function uploadFile(file) {
	alert(file);
}

function FileUpload(props) {
	return (
		<div id='App-fileUpload'>
			<form onSubmit={uploadFile}>
				<input name='uploadFile' type='file' />
				<input type='submit' value='uploadFile' ref='thisFileInput' />
			</form>
			<img
				className='App-closeButton'
				src={closeIcon}
				alt='X'
				onClick={e => {
					//stopPropagation seems to to the same as cancelBubble...
					e.stopPropagation();
					props.changeState();
				}}
			/>
		</div>
	);
}

export default FileUpload;
