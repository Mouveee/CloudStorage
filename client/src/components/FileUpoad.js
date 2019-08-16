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
				<input
					name='uploadFile'
					type='file'
					placeholder='choose File to upload...'
				/>
				<input type='submit' value='uploadFile' ref='thisFileInput' />
			</form>
			<img
				className='App-closeButton'
				src={closeIcon}
				alt='X'
				onClick={e => {
					e.stopPropagation();
					props.changeState();
				}}
			/>
		</div>
	);
}

export default FileUpload;
