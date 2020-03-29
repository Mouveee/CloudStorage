import * as React from 'react';

import './Biography.css'

import books from './../img/books.JPG';
import guitar from './../img/guitar.JPG';

class Biography extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.visible,
      mobileClass: this.props.isMobile ? ' App-mobile' : ''
    }
  }

  render() {
    let classOfContainer = '';

    if (this.state.visible) {
      classOfContainer += 'App-mainVisibile';
    }

    return (
      <div id='App-mainPage' className={classOfContainer + this.state.mobileClass}>
        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={books} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
            Ich hatte schon immer großes Interesse an Literatur, in letzter Zeit hat es mir besonders Haruki Murakami
            angetan.
            <div className={'App-bioBorder' + this.state.mobileClass}></div>
          </div>

        </div>

        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={guitar} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
            Musik machen, Musik hören, Vinyl sammeln.
            <div className={'App-bioBorder' + this.state.mobileClass}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Biography;



