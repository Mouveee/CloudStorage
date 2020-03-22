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
          <img src={books} className='App-bioPic' alt='missing pic'></img>
          <div className="App-bioContent">
            Um mich von technischer Probelemlösung abzulenken und neue Impulse zu bekommen
            lese ich gerne Romane, besonders Haruki Murakami hat es mir schwer angetan.
          </div>
        </div>

        <div className="App-bioEntry">
          <img src={guitar} className='App-bioPic' alt='missing pic'></img>

          <div className="App-bioContent">
            Musik ist nicht alles, aber sehr vieles. Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.Musik ist nicht alles, aber sehr vieles.
            </div>
        </div>
      </div>
    )
  }
}

export default Biography;



