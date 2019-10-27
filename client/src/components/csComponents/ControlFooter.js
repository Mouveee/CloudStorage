import React from "react";

import "./ControlFooter.css";

import downloadIcon from "../../img/download.svg";
import trashIcon from "../../img/trashcan.svg";
import uploadIcon from "../../img/upload.svg";

class ControlFooter extends React.Component {
	render() {
		return (
			<nav id='App-controlFooter' className={this.props.isMobile ? 'mobileControlFooter' : ''}>
				{Object.keys(this.props.selectedItems).length > 0 ? (
					<img src={downloadIcon} alt=':(' className='App-controlElement' />
				)
					: null
				}

				<img
					src={uploadIcon}
					alt=':('
					className='App-controlElement'
					onClick={this.props.uploadFile}
				/>

				{Object.keys(this.props.selectedItems).length > 0 ? (
					<img
						src={trashIcon}
						alt=':('
						className='App-controlElement'
						onClick={() => { this.props.deleteItem(this.props.selectedItems) }}
					/>
				)
					: null
				}

				<input
					id='App-folderInput'
					placeholder='create new folder...'
					className='App-controlElement'
					autoComplete='false'
				/>
			</nav>
		)
	};
}

export default ControlFooter;
