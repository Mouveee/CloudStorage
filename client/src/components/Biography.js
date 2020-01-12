import * as React from 'react';

import './Biography.css';

import fader from '../HOC/Fader'

class Biography extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: this.props.visible }

    this.timeOut = null;
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeOut);
  }

  render() {
    let classOfContainer = '';

    if (this.state.visible) {
      classOfContainer += 'App-mainVisibile';
    }

    if (this.props.isMobile) {
      classOfContainer += ' mobile'
    }

    return (
      <div id='App-mainPage' className={classOfContainer}>
        <section>
          <h2>Allgemein</h2>
          <div>
            Geboren am 10. September 1983 in Saarbrücken
          </div>
          <div>
            Staatsbürgerschaft: deutsch
          </div>
          <div>
            Familienstand: ledig
          </div>
        </section>
        <section>

          <h2>
            Ausbildung
      </h2>
          <div className='App-bioEntry'>
            <span className='App-bioTitle'>2019</span>
            <span className='App-bioContent'>Abschluss Microsoft Zertifikat MS-70-480</span>
            <br></br>
            <span className='App-bioContent'>
              Microsoft Exam Web Development (Javascript, CSS, HTML)
            </span>
          </div>

          <div className='App-bioEntry'>
            <span className='App-bioTitle'>2017 - 2019</span>
            <span className='App-bioContent'>Umschulung zum Fachinformatiker Anwendungsentwicklung</span>
            <br></br>
            <span className='App-bioContent'>
              <strong>ti taylorix institut für berufliche Bildung e.V., Saarbrücken</strong>, <br></br>
              parallel Praktikum  und anschließende Beschäftigung bei <strong>Experts Inside GmbH</strong>
            </span>
          </div>

          <br></br>

          <div className='App-bioEntry'>
            <span className='App-bioTitle'>2006 - 2009</span>
            <span className='App-bioContent'>Studium Kommunikationsinformatik</span>
            <br></br>
            <div className='App-bioContent'>
              <strong>Hochschule für Technik und Wirtschaft Saarbrücken</strong>
              <br></br>
              ohne Abschluss
            </div>
          </div>

          <h2>Beruflicher Werdegang</h2>

          <div className='App-bioEntry'>
            <span className='App-bioTitle'>2009 - 2017</span>
            <span className='App-bioContent'>Servicekraft</span>
            <br></br>
            <span className='App-bioContent'>
              Hardrock Cafe Völklingen<br></br>
              seit 2014 "Es Cafe Völklingen" aufgrund einer Urheberrechtsklage
            </span>
          </div>

          2004 – 2005

          Zivildienst

          Schülerzentrum „Grünes Haus“, Völklingen

          2001 – 2003

          Fachoberschule für Design, Saarbrücken

          Abschluss: Fachabitur

          Berufserfahrung

          2017 - 2019

          Umschulung bei Taylorix eV, parallel Beschäftigung bei Experts Inside als Web Developer

          2013 - 2017

          Servicekraft

          „Es - Cafe“ (ehemals Hardrock Cafe), Völklingen

          2012 - 2013

          Call Center Agent

          Arvato, Eiweiler

          2011 - 2012

          Servicekraft

          Cafe Umwalzer(Weltkulturerbe Völklinger Hütte)

          2009 - 2011

          Servicekraft

          „Hardrock Cafe“, Völklingen

          2003 - 2004


          Servicekraft

          Pizzeria Enoteca, Völklingen Ludweiler
    </section>
      </div>
    )
  }
}

export default fader(Biography);