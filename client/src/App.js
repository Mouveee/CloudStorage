import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";

import MobileDetect from 'mobile-detect';
import posed from 'react-pose';

//custom components, hopefully well written
import About from './components/About.js';
import CloudStorage from './components/CloudStorage.js'
import Header from './components/Header.js';
import Login from './components/Login.js'
import Main from './components/Main.js';
import NavBar from './components/NavBar.js';
import NotFound from './components/NotFound.js';

import "./App.css";

const MainTable = posed.table();

document.title = 'Marco Huwig - Web Developer';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			route: 'main', //main, cloudStorage or about,
			userRole: 'guest', //admin, user, guest 
			visible: false
		};

		this.changeRoute.bind(this);
	}

	componentDidMount = setTimeout(() => this.setState({ visible: true }), 10);

	changeRoute = async route => {
		this.setState({ visible: false })
		setTimeout(() => this.setState({ route: route }), 500);
		setTimeout(() => this.setState({ visible: true }), 550);
	}

	changeUserRole = role => {
		this.setState({ userRole: role })
		console.log('role changed to: ' + this.state.userRole)
	}

	render() {
		// window.chrome ? console.log('Running on chrome...') : console.log('');
		const md = new MobileDetect(
			window.navigator.userAgent
		);

		const classOfMainContainer = this.state.visible ? 'visible' : 'invisible';

		return (

			<div className={'App-container'}>
				<Header
					isMobile={md.phone() ? true : false}
					changeRoute={this.changeRoute}
				/>

				<NavBar
					isMobile={md.phone() ? true : false}
					changeRoute={this.changeRoute}
				/>

				{/* this will be slowly faded in when changing this.state.visible */}
				<div id='App-mainContainer' className={classOfMainContainer}>


					{(() => {
						switch (this.state.route) {
							case 'main': return (
								<Main
									isMobile={md.phone() ? true : false}
								/>)
							case 'cloudStorage': return (
								this.state.userRole === 'admin' || this.state.userRole === 'user' ?
									<CloudStorage
										isMobile={md.phone() ? true : false}
									/> :
									<Login
										changeUserRole={this.changeUserRole}
										isMobile={md.phone() ? true : false}
									/>);
							case 'about': return (
								<About
									isMobile={md.phone() ? true : false}
								/>
							)
							default: return (<NotFound />)
						}
					})()}
				</div>

			</div >
		);
	}
}

export default App;


		// use if needed
		// console.log(md.mobile() ? 'running on mobile ' + md.mobile() : 'no mobile');          // 'Sony'
		// console.log(md.phone() ? 'phone type: ' + md.phone() : 'this is not a telephone');           // 'Sony'
		// console.log(md.tablet());          // null
		// console.log(md.userAgent());       // 'Safari'
		// console.log(md.os() ? 'os: ' + md.os() : `couldn't determine os...`);              // 'AndroidOS'
		// console.log(md.is('iPhone'));      // false
		// console.log(md.is('bot'));         // false
		// console.log(md.version('Webkit'));         // 534.3
		// console.log(md.versionStr('Build'));       // '4.1.A.0.562'
		// console.log(md.match('playstation|xbox')); // false
