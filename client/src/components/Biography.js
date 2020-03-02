import * as React from 'react';

import './Biography.css';

import fader from '../HOC/Fader'

class Biography extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: this.props.visible }

    this.timeOut = null;
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeOut);
  }

  render() {
    let classOfContainer = '';

    if (this.state.visible) {
      classOfContainer += 'App-mainVisibile';
    }

    if (this.props.isMobile) {
      classOfContainer += ' mobile'
    }

    return (
      <div id='App-mainPage' className={classOfContainer}>

      </div>
    )
  }
}

export default fader(Biography);