import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import Fullscreen from "react-full-screen";

import MobileDetect from 'mobile-detect';

//custom components, hopefully well written
import About from './components/About.js';
import AllowCookies from './components/AllowCookies.js';
import Biography from './components/Biography.js';
import EntryPage from './components/EntryPage.js';
import Header from './components/Header.js';
import NavBar from './components/NavBar.js';
import NotFound from './components/NotFound.js';
import SideBar from './components/SideBar.js';
import Skills from './components/Skills.js';
import UserInfo from './components/UserInfo.js';

import './App.css';

const md = new MobileDetect(
	window.navigator.userAgent
);

//conditional importing css for mobile or desktop
const isMobile = md.phone() ? true : false;
document.title = 'Marco Huwig Web Development';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowCookies: document.cookie.search('cookiesAllowed=true') !== -1 ? false : true,
			askedForCookies: this.allowCookies ? true : false,
			askedForFullscreen: isMobile ? false : true,
			fullScreen: false,
			loggedInUser: '',
			mobileClass: isMobile ? ' App-mobile' : '',
			route: 'main',
			user: null,
			userRole: 'guest', //admin, user, guest 
			visible: false,
		};

		this.changeRoute.bind(this);
		this.setCookieAllowance.bind(this);
	}

	componentDidMount = () => {
		setTimeout(() => this.setState({ visible: true }), 800);
	}

	// callBackend = async (destination, requestBody) => {
	// 	const response = await fetch(destination, {
	// 		method: "POST", // *GET, POST, PUT, DELETE, etc.
	// 		mode: "cors", // no-cors, cors, *same-origin
	// 		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	// 		credentials: "include", // include, *same-origin, omit
	// 		headers: {
	// 			"Content-Type": `application/json`,
	// 			Accept: "*/*",
	// 			// "Authorization": `Basic ${btoa(`${requestBody.userName}:${requestBody.password}`)}`
	// 			// 'Content-Type': 'application/x-www-form-urlencoded',
	// 		},
	// 		redirect: "follow", // manual, *follow, error
	// 		referrer: "no-referrer", // no-referrer, *client
	// 		body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
	// 	}).then(response => { return response });

	// 	return response
	// }

	changeRoute = route => {
		if (route !== this.state.route) {
			this.setState({ visible: false })
			setTimeout(() => this.setState({ route: route }), 500);
			setTimeout(() => this.setState({ visible: true }), 550);
		}
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

	render() {
		const classOfMainContainer = `${this.state.visible ? 'visible' : 'invisible'}${this.state.mobileClass}`;

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
						isMobile={isMobile}
						changeRoute={this.changeRoute}
					/>

					<NavBar
						isMobile={isMobile}
						changeRoute={this.changeRoute}
						setVisiblePage={this.setVisiblePage}
					/>

					<SideBar
						isMainRoute={true}
						isMobile={isMobile}
						changeRoute={this.changeRoute}
						visiblePage={this.state.visiblePage}
					/>

					{this.state.userRole !== 'guest' ? <UserInfo /> : <p></p>}

					{/* this will be slowly faded in when changing this.state.visible */}
					<div id='App-mainContainer' className={classOfMainContainer}>
						{(() => {
							switch (this.state.route) {
								case 'main': return (
									<EntryPage
										isMobile={isMobile ? true : false}
										changeRoute={this.changeRoute}
										visiblePage={this.state.visiblePage}
									/>
								)
								case 'skills': return (
									<Skills
										isMobile={isMobile ? true : false}
										changeRoute={this.changeRoute}
										visiblePage={this.state.visiblePage}
									/>
								)
								case 'about': return (
									<About
										isMobile={isMobile ? true : false}
										changeRoute={this.changeRoute}
									/>
								)
								case 'biography': return (
									<Biography
										isMobile={isMobile}
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
