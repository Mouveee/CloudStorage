import React from 'react';

import './WaitingScreen.css';

class WaitingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let handleVisible = this.state.visible ? 'visible' : 'dummyClass';

    return (
      <div id='App-folderList'>
        <img id='App-waitIcon' src={this.props.waitIcon} alt='loading...' className={handleVisible} />
      </div>)
  }
}

export default WaitingScreen;