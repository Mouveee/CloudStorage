import * as React from 'react';

import './Biography.css'

import books from './../img/books.JPG';
import guitar from './../img/guitar.JPG';
import vsc from './../img/vsc.JPG';

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
      <div id='App-mainPage' className={classOfContainer + this.state.mobileClass + ' App-bio'}>
        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={vsc} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
              Ich schreibe ich gerne Code. Ich lösche Code wenn er besser geschrieben werden kann. Ich schreibe neuen Code
            <div className={'App-bioBorder' + this.state.mobileClass}></div>
          </div>
        </div>

        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={books} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
              Ich hatte schon immer großes Interesse an Literatur, besonders Haruki Murakami
              oder Shirley Jackson gehören zu meinen Favoriten.
            <div className={'App-bioBorder' + this.state.mobileClass}></div>
          </div>
        </div>

        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={guitar} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
              Ich liebe es, Musik zu machen, zu hören und auf Vinyl zu sammeln. Ob nun auf der Gitarre
              oder mit Ableton Live.
          </div>
        </div>
      </div>
    )
  }
}

export default Biography;



