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
    return (
      <div id='App-mainPage' className={this.state.mobileClass + ' App-bio'}>
        <div className={'App-bioEntry' + this.state.mobileClass}>


          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={vsc} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
            Ich schreibe gerne Code. Ich warte und faktoriere gerne Code. Ich lösche Code wenn er überflüssig ist. Ich konzeptioniere und setze gerne
            User Interfaces um.
          </div>

          <div className={'App-bioBorder' + this.state.mobileClass}></div>
        </div>

        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={books} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
            Ich hatte schon immer großes Interesse an Literatur, besonders Haruki Murakami, James Graham Ballard
            und Shirley Jackson gehören zu meinen Lieblingsautoren.
          </div>

          <div className={'App-bioBorder' + this.state.mobileClass}></div>
        </div>

        <div className={'App-bioEntry' + this.state.mobileClass}>
          <div className={'App-bioContent' + this.state.mobileClass}>
            <img src={guitar} className={'App-bioPic' + this.state.mobileClass} alt='missing pic'></img>
            Ich liebe es, Musik zu machen, zu hören und auf Vinyl zu sammeln. Elektronisch oder handgemacht.
            Auf der Gitarre
            oder mit Ableton Live. Oder beidem.
          </div>

          <div className={'App-bioBorder' + this.state.mobileClass + ' invisible'}></div>
        </div>
      </div>
    )
  }
}

export default Biography;



