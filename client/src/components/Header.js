import React, { Component } from "react";
import actualizeIcon from "../img/actualize.svg";
import backIcon from "../img/arrow_back.svg";
import "./Header.css";

import Avatar from "./avatar.js";

class ControlHeader extends Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }
	}

	render() {
		let classVisibility = this.state.visible ? 'visible' : '';;

		setTimeout(() => this.setState({ visible: true }))

		return (
			<h1 id='App-header' className={classVisibility}>
				<Avatar />
				OKTODRIVE
			<small className='App-subHeader' >...praise the Octopus Baby...</small>
				<nav className='App-navBar'>
					{!this.props.root ? (
						<img
							src={backIcon}
							alt='<-'
							onClick={this.props.navigateBack}
							className='App-navItem'
						/>
					) : null}
					<img
						src={actualizeIcon}
						alt='<-->'
						onClick={this.props.actualize}
						className='App-navItem'
					/>
					{!this.props.root ? (
						<div>Current Folder: {this.props.currentFolder}</div>
					) : (
							<div>Root Folder</div>
						)}
				</nav>
			</h1 >
		);
	}
}

export default ControlHeader;
