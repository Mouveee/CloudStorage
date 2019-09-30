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
		setTimeout(() => this.setState({ visible: true }))

		return (
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
		);
	}
}

export default SideBar;
