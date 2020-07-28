import * as React from 'react';

import avatar from '../img/myself.jpg';

import './EntryPage.css';



class EntryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      mobileClass: this.props.isMobile ? ' App-mobile' : ''
    }
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let classHead = 'App-head' + this.state.mobileClass;
    let classAvatar = this.state.mobileClass;

    let mainClass = '';

    if (this.state.visible) {
      mainClass += `App-mainVisibile${this.state.mobileClass}`;
    }

    return (
      <section
        id='App-mainPage'
        className={mainClass}
      >
        <div className={classHead} id='App-mainHeader'>

        </div>

        <section className='App-mainText'>
          <h1 id='App-entryHead' className={this.state.mobileClass}>
            <img
              src={avatar}
              id='App-avatar'
              rel="preload"
              className={classAvatar} alt=':('
            />

            MARCO&nbsp;HUWIG

            <div id='App-subHeaderEntrypage' className={this.state.mobileClass}>
              <small>Web Developer</small>
            </div>
          </h1>

          <div id='App-introductionText' className={this.state.mobileClass}>
            Als Web Developer liegen meine Kernkompetenzen im Umgang mit Technologien wie <i>HTML, Javascript und CSS</i>{' '}
            sowie verwandten Tools, Libraries und Frameworks. Diese Seite wurde zum Beispiel
            mit <i>React</i> erstellt.
            Eine detailliertere Auflistung meiner Kenntnisse und Erfahrungen findet sich unter
            {' '}<i className='App-clickable' onClick={() => this.props.changeRoute('skills')}>Kenntnisse</i>.
            <br></br>
            Als Web Developer besteht ein Großteil meiner Aufgaben in der Konzeptionierung und Gestaltung von Websites
            und deren praktischer Umsetzung in Codeform im Frontend, sowie in der Entwicklung von REST-APIs und
            Datenverarbeitung im Backend.
            Ich sehe mich dabei als klassischen Problemlöser: Der Kunde hat ein Problem, meine Aufgabe ist es dieses zu analysieren,
            seinen Ursprung zu finden und es schließlich zu lösen.
            <br></br>
            Neben der Webentwicklung beschäftige ich mich intensiv mit digital erstellter Musik und Sounddesign mit <i>Ableton Live</i> und bin
            begeisterter Leser von Romanen.
            <br></br>
            Ich bin erreichbar unter meiner <i><a type="email" className="App-clickable" href="mailto:huwig.marco@gmail.com">E-Mail Adresse </a></i>
            oder in den <i className="App-clickable" onClick={() => this.props.changeRoute('about')}>Kontaktdaten</i>.
          </div>
        </section>
      </ section >
    )
  }
}

export default EntryPage;

