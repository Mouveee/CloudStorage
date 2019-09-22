import React, { Component } from "react";

import "./Header.css";

import Avatar from "./avatar.js";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }
	}

	render() {
		let classVisibility = this.state.visible ? 'visible' : '';;

		setTimeout(() => this.setState({ visible: true }))

		return (
			<h1 id='App-header' className={this.props.isMobile ? classVisibility + ' mobileHeader' : classVisibility}>
				<Avatar />
				OKTODRIVE
			<small className='App-subHeader' >...praise the Octopus Baby...</small>
			</h1 >
		);
	}
}

export default Header;
