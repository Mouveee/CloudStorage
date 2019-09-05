import React from 'react';

import './WaitingScreen.css';

class WaitingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  render() {
    let handleVisible = this.state.visible ? 'visible' : 'dummyClass';
    setTimeout(() => this.setState({ visible: true }))

    return (
      <div id='App-folderList'>
        <img id='App-waitIcon' src={this.props.waitIcon} alt='loading...' className={handleVisible} />
      </div>)
  }
}

export default WaitingScreen;