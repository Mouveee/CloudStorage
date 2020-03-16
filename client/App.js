import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import Fullscreen from "react-full-screen";

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

const md = new MobileDetect(
	window.navigator.userAgent
);

//conditional importing css for mobile or desktop
if (md.phone()) {
	import('./App-mobile.css').then((css) => console.log('imported mobile'))
} else import('./App.css').then((css) => console.log('desktop css'))

document.title = 'Marco Huwig Web Development';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowCookies: document.cookie.search('cookiesAllowed=true') !== -1 ? false : true,
			askedForCookie: this.allowCookies ? true : false,
			askedForFullscreen: md.phone() ? false : true,
			fullScreen: false,
			loggedInUser: '',
			route: 'main',
			user: null,
			userRole: 'guest', //admin, user, guest 
			visible: false,
			visiblePage: 'main'
		};

		this.changeRoute.bind(this);
		this.setCookieAllowance.bind(this);
		this.setVisiblePage.bind(this);
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

		document.cookie = `cookiesAllowed=${allowed}`
	}

	setFullScreen = () => {
		this.setState({ fullScreen: true });
	}

	//sets visible SUB page
	setVisiblePage = route => {
		if (this.state.visiblePage !== route) {
			console.log(`setting sub page to: ${route}`)
			this.setState({ visible: false });
			setTimeout(() => { this.setState({ visiblePage: route }); console.log(`visible page set to: ${this.state.visiblePage}`) }, 600);
			setTimeout(() => this.setState({ visible: true }), 650);

		}
	}

	render() {
		const classOfMainContainer = this.state.visible ? 'visible' : 'invisible';

		return (
			<div className={'App-container'}>
				{(() => {
					if (!this.state.askedForCookies
						&& this.state.userRole === 'guest'
					) {
						return (
							<AllowCookies
								cookiesAllowed={this.state.allowCookies}
								isMobile={md.phone() ? true : false}
								setCookieAllowance={this.setCookieAllowance}
								setFullScreen={this.setFullScreen}
							/>
						);
					}
				})()}

				<Fullscreen
					enabled={this.state.fullScreen}
				>
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
										changeRoute={this.changeRoute}
										setVisiblePage={this.setVisiblePage}
										visiblePage={this.state.visiblePage}
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
										changeRoute={this.changeRoute}
										setVisiblePage={this.setVisiblePage}
									/>
								)
								default: return (<NotFound />)
							}
						})()}



					</div>
				</Fullscreen >
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
