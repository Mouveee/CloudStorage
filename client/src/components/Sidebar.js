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

	componentDidMount = () => {
		this.setState({ visible: true });
	}

	render() {
		let faderClass = 'visible';

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
						Vita
				</div>
				</nav>
				:
				<nav id='App-sideBar' className={faderClass += ' mobileSideBar'}>
					<span
						className='App-sideBarItem mobile'
						onClick={() => this.changeView('main')}
					>
						Über mich
				</span>

					<span> || </span>

					<span
						className='App-sideBarItem mobile'
						onClick={() => this.changeView('skills')}
					>
						Kenntnisse
				</span>

					<span> || </span>

					<span
						className='App-sideBarItem mobile'
						onClick={() => this.changeView('biography')}
					>
						Vita
				</span>
				</nav>
		)
	}
}

export default SideBar;
