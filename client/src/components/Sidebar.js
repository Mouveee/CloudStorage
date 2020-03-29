import React from "react";

import "./SideBar.css";

class SideBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			mobileClass: this.props.isMobile ? ' App-mobile' : ''
		}
	}

	componentDidMount = () => {
		this.setState({ visible: true });
	}

	render() {
		let faderClass = 'visible';

		return (
			<div id='App-sideBar' className={faderClass + this.state.mobileClass}>
				<div
					className='App-sideBarItem mobile'
					onClick={() => this.props.changeRoute('biography')}
				>
					Über mich
				</div>
			</div>
		)
	}
}

export default SideBar;
