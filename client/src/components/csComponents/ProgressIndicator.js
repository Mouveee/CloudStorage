import React from 'react';

import './ProgressIndicator.css';
import closeIcon from '../../img/close.svg';
import progressIcon from '../../img/actualize.gif';

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  cancelAndDelete = item => {
    let file = item.split('/').pop() + '.zip';
    const folder = './internal/';
    const content = {
      key: { name: folder + file, type: 'file' }
    }

    this.props.deleteItem(content, true);
    this.props.finishZipping();
  };

  clickFunction = async item => {
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

    if (this.props.finishedItems.length > 0) {
      myClass += ' App-itemFinished';
    }

    let message = this.props.inProgress.length > 0 ?
      'zipping your folder...'
      : this.props.finishedItems[this.props.finishedItems.length - 1].split('/').pop() + '.zip';

    setTimeout(() => this.setState({ visible: true }))

    return (
      <div id='App-progressIndicator'
        className={myClass}
      >
        <span
          onClick={() => this.clickFunction(this.props.finishedItems[this.props.finishedItems.length - 1])}
        >
          {message}
        </span>
        {this.props.finishedItems.length === 0 ?

          <img
            src={progressIcon}
            alt='processing'
            className='App-progressIcon'>
          </img>

          :

          <img
            src={closeIcon}
            alt='close'
            onClick={() => this.cancelAndDelete(this.props.finishedItems[this.props.finishedItems.length - 1])}
            className='App-progressIcon'>
          </img>
        }
      </div>
    )
  }
}

export default ProgressIndicator;