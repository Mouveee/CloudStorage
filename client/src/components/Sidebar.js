import React from "react";

import "./SideBar.css";

class SideBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }
	}

	render() {
		let faderClass = this.state.visible ? 'visible' : 'bullshitClass';
		setTimeout(() => this.setState({ visible: true }))

		return (
			<nav id='App-sideBar' className={faderClass}>
				<div className='App-sideBarItem'>about</div>
				<div>...</div>
				<div className='App-sideBarItem'>credits</div>
				<div>...</div>
				<div className='App-sideBarItem'>porn</div>
			</nav>
		);
	}
}

export default SideBar;
