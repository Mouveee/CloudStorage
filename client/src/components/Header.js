import React, { Component } from "react";

import './Header.css';

import myVideo from "../vids/head.mp4";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mobileClass: this.props.isMobile ? ' App-mobile' : '',
			visible: false
		}
	}

	componentDidMount = () => {
		document.getElementById('App-headerVideo').playbackRate = 0.7;

		setTimeout(() => {
			this.setState({ visible: true })
		}, 0)
	}

	render() {
		let classVisibility = this.state.visible ? 'visible' : '';

		let classCaption = 'App-caption';
		let classSubHeader = 'App-subHeader';

		return (
			<header id='App-header' className={classVisibility + this.state.mobileClass} >
				<video autoPlay muted loop id="App-headerVideo" className={this.state.mobileClass}>
					<source src={myVideo} type="video/mp4"></source>
					<p>Video nicht geladen :(</p>
				</video>
				<div id="App-headerDiv" className={this.state.mobileClass}>
					<h1 className={classCaption += this.state.mobileClass}>
						MARCO HUWIG
						<span className={classSubHeader += this.state.mobileClass} >
							{'\t             '}Web Development
					</span>
					</h1>
				</div>
			</header>
		);
	}
}

export default Header;
