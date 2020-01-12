import React, { Component } from "react";

import "./Header.css";

import octopus from "../img/myself.jpg";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }
	}

	componentDidMount = () => {
		setTimeout(() => this.setState({ visible: true }))
	}

	render() {
		let classVisibility = this.state.visible ? 'visible' : '';

		let classCaption = 'App-caption';
		let classSubHeader = 'App-subHeader';

		return (
			<header id='App-header' className={this.props.isMobile ? classVisibility + ' mobileHeader' : classVisibility}>
				{/* <img
					src={octopus}
					id='App-avatar'
					className={classAvatar} alt=':('
					onClick={() => this.props.changeRoute('main')}
				/> */}

				<div id="App-headerDiv" className={this.props.isMobile ? 'mobileHeader' : ''}>
					<h1 className={classCaption += this.props.isMobile ? ' mobileHeader' : ''}>
						MARCO HUWIG
					</h1>

					<h2 className={classSubHeader += this.props.isMobile ? ' mobileHeader' : ''} >
						WEB DEVELOPMENT
					</h2>
				</div>
			</header>
		);
	}
}

export default Header;
