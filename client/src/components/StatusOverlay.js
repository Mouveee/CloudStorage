import React from 'react';

import './StatusOverlay.css';

class StatusOverlay extends React.Component {
  render() {
    let dots = setInterval(() => {
      return '.'
    }, 10)

    return <div id='App-statusOverlay'>Message: {this.props.message}<div>{dots}</div></div>
  }
}

export default StatusOverlay;