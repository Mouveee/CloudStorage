import React from 'react';

import './ProgressIndicator.css';
import progressIcon from '../img/actualize.gif';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  clickFunction = item => alert(this.props.finishedItems.length > 0 ? this.props.handleFileClick(item) : 'unarmed')

  render() {
    let myClass = this.state.visible ?
      'App-progressVisible'
      : '';

    this.props.finishedItems.length > 0 ?
      myClass += ' App-itemFinished'
      : myClass = myClass;

    let message = this.props.inProgress.length > 0 ?
      'zipping your folder...'
      : this.props.finishedItems[this.props.finishedItems.length - 1].split('/').pop() + '.zip';

    setTimeout(() => this.setState({ visible: true }))

    return (
      <div id='App-progressIndicator'
        className={myClass}
        onClick={() => this.clickFunction(this.props.finishedItems[this.props.finishedItems.length - 1])}
      >
        {message}
        {/* TODO: Add deletion icon */}
        {this.props.finishedItems.length < 0 ?
          <img src={progressIcon} alt='processing' className='App-progressIcon'></img> : null
        }
      </div>
    )
  }
}

export default ProgressIndicator;