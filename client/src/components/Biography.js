import * as React from 'react';

class Biography extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    setTimeout(() => this.setState({ visible: true }));

    return (
      <div
        id='App-mainPage'
        className={this.state.visible ? 'App-mainVisibile' : ''}
      >
        <h1>
          Lebenslauf
        </h1>

        <table>
          <tbody>
            <tr>
              <td className="Tabelle1_A1">
                <p className="P2">Geboren am</p><p className="P2"> </p>
                <p className="P2">In</p><p className="P2"> </p>
                <p className="P2">Staatsbürgerschaft</p>
                <p className="P2"> </p>
                <p className="P2">Familienstand</p>
                <p className="P2"> </p>
              </td>
              <td className="Tabelle1_B1">
                <p className="P2">10. September 1983</p>
                <p className="P2"> </p>
                <p className="P2">Saarbrücken</p>
                <p className="P2"> </p>
                <p className="P2">deutsch</p>
                <p className="P2"> </p>
                <p className="P2">ledig</p>
                <p className="P2"> </p>
              </td>
              <td className="Tabelle1_C1">
                <p className="P2"> </p>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="P2"> </p>
        <p className="P3"> Ausbildung</p>
        <p className="P2"> </p>

        <table border="0" cellSpacing="0" cellPadding="0" className="Tabelle2">
          <tbody>
            <tr>
              <td className="Tabelle2_A1">
                <p className="P2">2017-2019</p>
              </td>
              <td className="Tabelle2_B1">
                <p className="P2">Umschulung zum Fachinformatiker Anwendungsentwicklung</p>
                <p className="P2">ti taylorix institut für berufliche Bildung e. V.,
                  Saarbrücken, parallel Praktikum und anschließende Beschäftigung bei
            Experts Inside GmbH</p>
                <p className="P2"> </p></td></tr>
          </tbody>
        </table>

        <p className="P2"> </p>
        <p className="P2"> </p>
        <p className="P3">Schule und Studium</p>
        <p className="P2"> </p>

        <table border="0" cellSpacing="0" cellPadding="0" className="Tabelle3">
          <tbody>
            <tr>
              <td className="Tabelle3_A1">
                <p className="P2">2006 - 2009</p>
              </td>
              <td className="Tabelle3_B1">
                <p className="P2">Studium Kommunikationsinformatik</p>
                <p className="P2">Hochschule für Technik und Wirtschaft (HTW), Saarbrücken</p>
                <p className="P2">ohne Abschluss</p>
                <p className="P2"> </p>
              </td>
            </tr>
            <tr>
              <td className="Tabelle3_A1">
                <p className="P1">
                  <span className="T1">2004 </span>
                  <span className="T1">–</span>
                  <span className="T1"> 2005</span>
                </p>
              </td>
              <td className="Tabelle3_B1">
                <p className="P2">Zivildienst</p>
                <p className="P1">
                  <span className="T1">Schülerzentrum </span>
                  <span className="T1">„</span>
                  <span className="T1">Gr</span>
                  <span className="T1">ünes Haus“, Völklingen</span>
                </p>
              </td>
            </tr>
            <tr>
              <td className="Tabelle3_A1">
                <p className="P2"> </p>
              </td>
              <td className="Tabelle3_B1">
                <p className="P2"> </p>
              </td>
            </tr>
            <tr>
              <td className="Tabelle3_A1">
                <p className="P1">
                  <span className="T1">2001 </span>
                  <span className="T1">–</span>
                  <span className="T1"> 2003</span>
                </p>
              </td>
              <td className="Tabelle3_B1">
                <p className="P2">Fachoberschule für Design, Saarbrücken</p>
                <p className="P2">Abschluss: Fachabitur</p>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="P2"> </p>
        <p className="P2"> </p>
        <p className="P3"> Berufserfahrung</p>
        <p className="P2"> </p>

        <table border="0" cellSpacing="0" cellPadding="0" className="Tabelle4">
          <tbody>
            <tr>
              <td className="Tabelle4_A1">
                <p className="P2">2017-2019</p>
              </td>
              <td className="Tabelle4_B1">
                <p className="P2">Umschulung bei Taylorix eV, parallel Beschäftigung bei
            Experts Inside als Web Developer</p>
              </td>
            </tr>
            <tr>
              <td className="Tabelle4_A1">
                <p className="P2"> </p>
              </td>
              <td
                className="Tabelle4_B1">
                <p
                  className="P2">
                </p>
              </td>
            </tr>
            <tr>
              <td
                className="Tabelle4_A1"><p
                  className="P2">2013 - 2017</p></td><td
                    className="Tabelle4_B1"><p
                      className="P2">Servicekraft</p><p className="P1"><span className="T1">„</span><span
                        className="T1">Es-Cafe</span><span className="T1">“</span><span
                          className="T1"> (ehemals Hardrock Cafe), V</span><span className="T1">ölklingen</span></p></td></tr><tr><td
                            className="Tabelle4_A1"><p
                              className="P2"> </p></td><td
                                className="Tabelle4_B1"><p
                                  className="P2"> </p></td></tr><tr><td
                                    className="Tabelle4_A1"><p
                                      className="P2">2012 - 2013</p></td><td
                                        className="Tabelle4_B1"><p
                                          className="P2">Call Center Agent</p><p className="P2">Arvato, Eiweiler</p></td></tr><tr><td
                                            className="Tabelle4_A1"><p
                                              className="P2"> </p></td><td
                                                className="Tabelle4_B1"><p
                                                  className="P2"> </p></td></tr><tr><td
                                                    className="Tabelle4_A1"><p
                                                      className="P2">2011 - 2012</p></td><td
                                                        className="Tabelle4_B1"><p
                                                          className="P2">Servicekraft</p><p className="P2">Cafe Umwalzer
            (Weltkulturerbe Völklinger Hütte)</p></td></tr><tr><td
              className="Tabelle4_A1"><p
                className="P2"> </p></td><td
                  className="Tabelle4_B1"><p
                    className="P2"> </p></td></tr><tr><td
                      className="Tabelle4_A1"><p
                        className="P2">2009 - 2011</p></td><td
                          className="Tabelle4_B1"><p
                            className="P2">Servicekraft</p><p className="P1"><span className="T1">„</span><span
                              className="T1">Hardrock Cafe</span><span className="T1">“</span><span
                                className="T1">, V</span><span className="T1">ölklingen</span></p></td></tr><tr><td
                                  className="Tabelle4_A1"><p
                                    className="P2"> </p></td><td
                                      className="Tabelle4_B1"><p
                                        className="P2"> </p></td></tr><tr><td
                                          className="Tabelle4_A1"><p
                                            className="P2">2003 - 2004</p></td><td
                                              className="Tabelle4_B1"><p
                                                className="P2">Servicekraft</p><p className="P2">Pizzeria Enoteca,
            Völklingen Ludweiler</p></td></tr><tr><td
              className="Tabelle4_A1"><p
                className="P2"> </p></td><td
                  className="Tabelle4_B1"><p
                    className="P2"> </p></td></tr>
          </tbody>
        </table>

        <p className="P2"> </p><p className="P2"
        /><p className="P2">
        </p>
        <p className="P2">
        </p>
        <p className="P3">
          Weitere Fähigkeiten
          und persönliche Interessen
        </p>
        <p className="P2"> </p>
        <table border="0"
          cellSpacing="0" cellPadding="0" className="Tabelle5">
          <tbody>
            <tr>
              <td className="Tabelle5_A1">
                <p className="P2">
                  Sprachen
                </p>
              </td>
              <td
                className="Tabelle5_B1">
                <p
                  className="P2">
                  Englisch
                </p>
              </td>
              <td
                className="Tabelle5_C1">
                <p
                  className="P2">
                  gut in Wort und Schrift
                </p>
              </td>
            </tr>
            <tr>
              <td
                className="Tabelle5_A1">
                <p
                  className="P2"> </p>
              </td>
              <td colSpan="2"
                className="Tabelle5_B1">
                <p
                  className="P2">
                </p>
              </td>
            </tr>
            <tr>
              <td
                className="Tabelle5_A1"><p
                  className="P2">IT</p></td><td colSpan="2"
                    className="Tabelle5_B1"><p
                      className="P2">HTML5, JavaScript (ES6), CSS und gängige Libraries
              (Jquery, Bootstrap...)</p><p className="P2">React Native und ReactJS
              (keine Projekterfahrung)</p><p className="P2">NodeJS</p><p className="P2">SCSS</p><p
                  className="P2">Source Control (Github, VSTS)</p><p className="P2">SQL und
              Datenbankentheorie</p><p className="P2">Grundlagen Netzwerktechnik</p><p
                  className="P2">MS-Office</p><p className="P2">Scrum</p></td></tr><tr><td
                    className="Tabelle5_A1"><p
                      className="P2"> </p></td><td colSpan="2"
                        className="Tabelle5_B1"><p
                          className="P2"> </p></td></tr><tr><td
                            className="Tabelle5_A1"><p
                              className="P2">Zertifikate/Exeman</p></td><td colSpan="2"
                                className="Tabelle5_B1"><p
                                  className="P1"><span className="T1">Microsoft 70-480</span><span
                                    className="T2">: Programming in HTML5 with JavaScript and CSS3</span></p></td></tr><tr><td
                                      className="Tabelle5_A1"><p
                                        className="P2"> </p></td><td colSpan="2"
                                          className="Tabelle5_B1"><p
                                            className="P2"> </p></td></tr><tr><td
                                              className="Tabelle5_A1"><p
                                                className="P2">Führerschein</p></td><td colSpan="2"
                                                  className="Tabelle5_B1"><p
                                                    className="P2">Klasse B</p></td></tr><tr><td
                                                      className="Tabelle5_A1"><p
                                                        className="P2"> </p></td><td colSpan="2"
                                                          className="Tabelle5_B1"><p
                                                            className="P2"> </p></td></tr><tr><td
                                                              className="Tabelle5_A1"><p
                                                                className="P2">Hobbys</p></td><td colSpan="2"
                                                                  className="Tabelle5_B1"><p
                                                                    className="P2">Musik, Literatur, Gaming</p></td></tr><tr><td
                                                                      className="Tabelle5_A1"><p
                                                                        className="P2"> </p></td><td colSpan="2"
                                                                          className="Tabelle5_B1"><p
                                                                            className="P2"> </p></td></tr></tbody></table><p className="P2"> </p><p
                                                                              className="P2"> </p><p className="P2"> </p><p className="P2">Völklingen, den </p>
      </div>
    )
  }
}

export default Biography;