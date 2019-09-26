import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";

import MobileDetect from 'mobile-detect';
import posed from 'react-pose';

//custom components, hopefully well written
import About from './components/About.js';
import CloudStorage from './components/CloudStorage.js'
import Header from './components/Header.js';
import Main from './components/Main.js';
import Navbar from './components/Navbar.js';
import NotFound from './components/NotFound.js';

import "./App.css";

const MainTable = posed.table();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			route: 'main' //main, cloudStorage or about
		};

		this.changeRoute.bind(this);
	}

	changeRoute = route => this.setState({ route: route });

	render() {
		// window.chrome ? console.log('Running on chrome...') : console.log('');

		const md = new MobileDetect(
			window.navigator.userAgent
		);

		// more typically we would instantiate with 'window.navigator.userAgent'
		// as user-agent; this string literal is only for better understanding

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


		return (
			< div className='App' >
				<header>
					<Header
						isMobile={md.phone() ? true : false}
					/>
				</header>

				<Navbar
					isMobile={md.phone() ? true : false}
					changeRoute={this.changeRoute}
				/>

				{(() => {
					switch (this.state.route) {
						case 'cloudStorage': return (
							<CloudStorage
								isMobile={md.phone() ? true : false}
							/>);
							break;
						case 'main': return (
							<Main
								isMobile={md.phone() ? true : false}
							/>)
							break;
						case 'about': return (
							<About
								isMobile={md.phone() ? true : false}
							/>
						)
						default: return (<NotFound />)
					}
				})()}

			</div >
		);
	}
}

export default App;
