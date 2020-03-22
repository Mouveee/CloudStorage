import React, { Component } from "react";

import myVideo from "../vids/head.webm";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }

		if (this.props.isMobile) {
			import('./Header-mobile.css').then();
		} else {
			import('./Header.css').then();
		}
	}

	componentDidMount = () => {
		document.getElementById('App-headerVideo').playbackRate = 0.7;
		setTimeout(() => this.setState({ visible: true }))
	}

	render() {
		let classVisibility = this.state.visible ? 'visible' : '';

		let classCaption = 'App-caption';
		let classSubHeader = 'App-subHeader';

		return (
			<header id='App-header' className={this.props.isMobile ? classVisibility + ' mobileHeader' : classVisibility}>
				<video autoPlay muted loop id="App-headerVideo">
					<source src={myVideo} type="video/webm"></source>
					<p>Video nicht geladen :(</p>
				</video>
				<div id="App-headerDiv" className={this.props.isMobile ? 'mobileHeader' : ''}>
					<h1 className={classCaption += this.props.isMobile ? ' mobileHeader' : ''}>
						MARCO HUWIG
						<span className={classSubHeader += this.props.isMobile ? ' mobileHeader' : ''} >
							{'\t             '}Web Development
					</span>
					</h1>
				</div>
			</header>
		);
	}
}

export default Header;
