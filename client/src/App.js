import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";

import MobileDetect from 'mobile-detect';

//custom components, hopefully well written
import About from './components/About.js';
import AllowCookies from './components/AllowCookies.js'
import CloudStorage from './components/CloudStorage.js'
import Header from './components/Header.js';
import Login from './components/Login.js'
import Main from './components/Main.js';
import NavBar from './components/NavBar.js';
import NotFound from './components/NotFound.js';
import UserInfo from './components/UserInfo.js';

import "./App.css";

document.title = 'Marco Huwig Web Development';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowCookies: false,
			askedForCookies: false,
			loggedInUser: '',
			route: 'main', //main, cloudStorage or about,
			user: null,
			userRole: 'guest', //admin, user, guest 
			visible: false
		};

		this.changeRoute.bind(this);
		this.setCookieAllowance.bind(this);
	}

	componentDidMount = () => {
		setTimeout(() => this.setState({ visible: true }), 800);
	}

	callBackend = async (destination, requestBody) => {
		const response = await fetch(destination, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, cors, *same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "include", // include, *same-origin, omit
			headers: {
				"Content-Type": `application/json`,
				Accept: "*/*",
				// "Authorization": `Basic ${btoa(`${requestBody.userName}:${requestBody.password}`)}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrer: "no-referrer", // no-referrer, *client
			body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
		}).then(response => { return response });

		return response
	}

	changeRoute = async route => {
		//to be sure no action is triggered unintentionally
		// document.removeEventListener('keypress');

		this.setState({ visible: false })
		setTimeout(() => this.setState({ route: route }), 500);
		setTimeout(() => this.setState({ visible: true }), 550);
	}

	changeUserRole = role => {
		this.setState({ userRole: role })
		console.log('role changed to: ' + this.state.userRole)
	}


	setCookieAllowance = (allowed) => {
		this.setState({
			allowCookies: allowed,
			askedForCookies: true
		});
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

				{this.state.userRole !== 'guest' ? <UserInfo /> : <p></p>}

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
										changeUserRole={this.changeUserRole}
										isMobile={md.phone() ? true : false}
										userRole={this.state.userRole}
									/>
									:
									<Login
										callBackend={this.callBackend}
										changeUserRole={this.changeUserRole}
										allowCookies={this.state.allowCookies}
										isMobile={md.phone() ? true : false}
										user={this.state.user}
										userRole={this.state.userRole}
									/>
							);
							case 'about': return (
								<About
									isMobile={md.phone() ? true : false}
								/>
							)
							default: return (<NotFound />)
						}
					})()}


					{(() => {
						if (!this.state.askedForCookies && this.state.userRole === 'guest') {
							return (
								<AllowCookies
									setCookieAllowance={this.setCookieAllowance}
								/>
							);
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
