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



		let navBarClass = 'App-navBar';

		if (this.state.visible) {
			navBarClass += ' App-navBarVisible';
			navBarClass += this.props.isMobile ? ' mobileHeader' : '';
		}

		let classAvatar = this.props.isMobile ? 'mobileHeader' : '';
		let classCaption = 'App-caption';
		let classSubHeader = 'App-subHeader';

		return (
			<header id='App-header' className={this.props.isMobile ? classVisibility + ' mobileHeader' : classVisibility}>
				<img src={octopus} id='App-avatar' className={classAvatar} alt=':(' />

				<h1 className={classCaption += this.props.isMobile ? ' mobileHeader' : ''}>
					MARCO HUWIG
				</h1>
				<h2 className={classSubHeader += this.props.isMobile ? ' mobileHeader' : ''} >
					Web Developer
				</h2>

				<nav className={navBarClass}>
					<span
						className='App-navItem'
						onClick={() => this.props.changeRoute('main')}
					>
						Main
        	</span>

					<span
						className='App-navItem'
						onClick={() => this.props.changeRoute('cloudStorage')}
					>
						Files
        	</span>

					<span
						className='App-navItem'
						onClick={() => this.props.changeRoute('about')}
					>
						About
        </span>
				</nav >

			</header>
		);
	}
}

export default Header;
