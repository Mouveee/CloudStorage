import React, { Component } from "react";

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
		setTimeout(() => this.setState({ visible: true }))
	}

	render() {
		let classVisibility = this.state.visible ? 'visible' : '';

		let classCaption = 'App-caption';
		let classSubHeader = 'App-subHeader';

		return (
			<header id='App-header' className={this.props.isMobile ? classVisibility + ' mobileHeader' : classVisibility}>
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
