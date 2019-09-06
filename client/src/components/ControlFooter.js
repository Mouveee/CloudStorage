import React from "react";

import "./ControlFooter.css";

import downloadIcon from "../img/download.svg";
import uploadIcon from "../img/upload.svg";

class ControlFooter extends React.Component {
	constructor(props) {
		super(props);

		this.state = { visible: false }
	}

	render() {
		let visibleFooter = this.state.visible ? 'App-footerVisible' : 'dummyClass';
		setTimeout(() => this.setState({ visible: true }));

		return (
			<nav id='App-controlFooter' className={visibleFooter}>
				{this.props.itemsSelected ? (
					<img src={downloadIcon} alt=':(' className='App-controlElement' />
				) : null}
				<img
					src={uploadIcon}
					alt=':('
					className='App-controlElement'
					onClick={this.props.uploadFile}
				/>
				<input
					id='App-folderInput'
					placeholder='create new folder...'
					className='App-controlElement'
				/>
			</nav>
		)
	};
}

export default ControlFooter;
