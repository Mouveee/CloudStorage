import React from 'react';

import './ProgressIndicator.css';
import progressIcon from '../img/actualize.gif';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    let visibility = this.state.visible ?
      'App-progressVisible'
      : 'dummyClass';

    setTimeout(() => this.setState({ visible: true }))

    return (
      <div id='App-progressIndicator' className={visibility}>
        {this.props.message}
        <img src={progressIcon} alt='processing' className='App-progressIcon'>
        </img>
      </div>
    )
  }
}

export default ProgressIndicator;