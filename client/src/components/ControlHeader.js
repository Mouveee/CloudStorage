import React from "react";
import actualizeIcon from "../img/actualize.svg";
import backIcon from "../img/arrow_back.svg";
import "./ControlHeader.css";

function ControlHeader(props) {
	console.log(`root received: ${props.root}`);

	return (
		<section id='App-info'>
			<nav className='App-navBar'>
				{!props.root ? (
					<img
						src={backIcon}
						alt='<-'
						onClick={props.navigateBack}
						className='App-navItem'
					/>
				) : (
					<p />
				)}
				<img
					src={actualizeIcon}
					alt='<-->'
					onClick={props.actualize}
					className='App-navItem'
				/>
				{!props.root ? (
					<div>Current Folder: {props.currentFolder}</div>
				) : (
					<div>Welcome</div>
				)}
			</nav>
		</section>
	);
}

export default ControlHeader;
