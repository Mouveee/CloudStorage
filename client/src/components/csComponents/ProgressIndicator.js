import React from 'react';

import './ProgressIndicator.css';
import closeIcon from '../../img/close.svg';
import progressIcon from '../../img/actualize.gif';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  cancelAndDelete = e => {
    e.cancelBubble = true;
    alert('event fired!')
  };

  clickFunction = async item => {
    alert('download will start')
    if (this.props.finishedItems.length > 0) {
      let file = item.split('/').pop() + '.zip';
      let folder = './internal/';

      let content = {
        key: { name: folder + file, type: 'file' }
      }

      new Promise((res, rej) => {
        res(this.props.handleFileClick(file, folder));
      }).then(res => {
        this.props.deleteItem(content, true);
        this.props.finishZipping();
      })
    }
  }

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
        {this.props.finishedItems.length === 0 ?
          <img src={progressIcon} alt='processing' className='App-progressIcon'></img>
          : <img src={closeIcon} alt='close' onClick={this.cancelAndDelete} className='App-progressIcon'></img>
        }
      </div>
    )
  }
}

export default ProgressIndicator;