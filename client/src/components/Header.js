import React from "react";
import actualizeIcon from "../img/actualize.svg";
import backIcon from "../img/arrow_back.svg";
import "./Header.css";

import Avatar from "./avatar.js";

function ControlHeader(props) {
	console.log(`root received: ${props.root}`);

	return (
		<h1 id='App-header'>
			<Avatar />
			OKTODRIVE
			<small className='App-subHeader'>...praise the Octopus Baby...</small>
			<nav className='App-navBar'>
				{!props.root ? (
					<img
						src={backIcon}
						alt='<-'
						onClick={props.navigateBack}
						className='App-navItem'
					/>
				) : null}
				<img
					src={actualizeIcon}
					alt='<-->'
					onClick={props.actualize}
					className='App-navItem'
				/>
				{!props.root ? (
					<div>Current Folder: {props.currentFolder}</div>
				) : (
						<div>Root Folder</div>
					)}
			</nav>
		</h1>
	);
}

export default ControlHeader;
