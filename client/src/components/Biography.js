import * as React from 'react';

import './Biography.css'

import books from './../img/books.JPG';
import guitar from './../img/guitar.JPG';
import octopus from './../img/baby-octopus.jpg'

class Biography extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: this.props.visible }
  }

  render() {
    let classOfContainer = '';

    if (this.state.visible) {
      classOfContainer += 'App-mainVisibile';
    }

    if (this.props.isMobile) {
      classOfContainer += ' mobile';
    }

    return (
      <div id='App-mainPage' className={classOfContainer}>
        <div className="App-bioEntry">
          <div className="App-bioContent">
            <img src={books} className='App-bioPic' alt='missing pic'></img>
            Ich hatte schon immer großes Interesse an Literatur, in letzter Zeit hat es mir besonders Haruki Murakami
            angetan.
          </div>
          <div className='App-bioBorder'></div>
        </div>

        <div className="App-bioEntry">
          <div className="App-bioContent">
            <img src={guitar} className='App-bioPic' alt='missing pic'></img>
            Musik machen, Musik hören, Vinyl sammeln.
            </div>
          <div className='App-bioBorder'></div>
        </div>
      </div>
    )
  }
}

export default Biography;



