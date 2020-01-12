import * as React from 'react';

import avatar from '../img/myself.jpg';

import './EntryPage.css';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let classHead = this.props.isMobile ? 'App-headMobile' : 'App-head';
    let classAvatar = this.props.isMobile ? 'mobileHeader' : '';


    let mainClass = '';
    if (this.state.visible) {
      mainClass += 'App-mainVisibile';
    }

    if (this.props.isMobile) {
      mainClass += ' mobile';
    }

    return (
      <section
        id='App-mainPage'
        className={mainClass}
      >
        <div className={classHead} id='App-mainHeader'>

        </div>

        <section className='App-mainText'>
          <h1 className={this.props.isMobile ? 'App-mobileHead' : ''}>
            <img
              src={avatar}
              id='App-avatar'
              className={classAvatar} alt=':('
              onClick={() => this.props.changeRoute('main')}
            />

            Mein Name ist Marco&nbsp;Huwig.<br></br> Ich bin ein in Saarbrücken lebender Full Stack Web Developer.
          </h1>
          {/* <br></br> */}
          <div>
            Als Web Developer liegen meine Kernkompetenzen im Umgang mit Technologien wie <i>HTML, Javascript und CSS</i>.
            Eine detailliertere Auflistung meiner Kenntnisse und Erfahrungen findest Du unter <i>Kenntnisse</i>.
            <br></br>
            Als Web Developer besteht ein Großteil meiner Aufgaben in der Konzeptionierung und Gestaltung von Websites
            und deren praktischer Umsetzung in Codeform im Frontend, sowie mit der Entwicklung von REST-APIs im Backend.
            Ich sehe mich abei als klassischen Problemlöser: Der Kunde hat ein Problem, meine Aufgabe ist es dieses zu analysieren,
            seinen Ursprung zu finden und es schließlich zu lösen.
            <br></br>
            Neben der Webentwicklung beschäftige ich mich intensiv mit digital erstellter Musik und Sounddesign und bin
            begeisterter Leser von Romanen.
            <br></br>
            Derzeit bin ich auf der Suche nach einer neuen beruflichen Herausfordeung. Ich freue mich über jede Anfrage
            diesbezüglich, Du erreichst mich unter meiner <a type="email" href="huwig.marco@gmail.com">EMail Adresse </a>
            oder in den Kontaktdaten.
          </div>
        </section>
      </ section >
    )
  }
}

export default EntryPage;

