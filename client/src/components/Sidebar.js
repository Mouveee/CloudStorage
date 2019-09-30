import React from "react";

import "./SideBar.css";

class SideBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }
	}

	changeView = route => {
		this.props.setVisiblePage(route);
	}

	render() {
		let faderClass = this.state.visible ? 'visible' : 'bullshitClass';
		setTimeout(() => this.setState({ visible: true }));


		return (
		!this.props.isMobile ?
			<nav id='App-sideBar' className={faderClass}>
				<div
					className='App-sideBarItem'
					onClick={() => this.changeView('main')}
				>
					Über mich
				</div>

				<div>...</div>

				<div
					className='App-sideBarItem'
					onClick={() => this.changeView('skills')}
				>
					Kenntnisse
				</div>

				<div>...</div>

				<div
					className='App-sideBarItem'
					onClick={() => this.changeView('biography')}
				>
					Lebenslauf
				</div>
			</nav>
		:
			<nav id='App-sideBar' className={faderClass  += ' mobileSideBar'}>
				<span
					className='App-sideBarItem'
					onClick={() => this.changeView('main')}
				>
					Über mich
				</span>

				<span>||</span>

				<span
					className='App-sideBarItem'
					onClick={() => this.changeView('skills')}
				>
					Kenntnisse
				</span>

				<span>||</span>

				<span
					className='App-sideBarItem'
					onClick={() => this.changeView('biography')}
				>
					Lebenslauf
				</span>
			</nav>
		)
	}
}

export default SideBar;
