import * as React from 'react';

//TODO: create new css file for list
import './Main.css';
import './Skills.css';

import fader from '../HOC/Fader';

class Skills extends React.Component {

  componentDidMount = () => {
    this.fadeInListEntries();
  }

  fadeInListEntries = () => {
    const listEntries = document.getElementsByClassName('App-listPoint');

    for (let i = listEntries.length - 1; i >= 0; i--) {
      setTimeout(() => {
        listEntries[i].className += ' opaque'
      }, 600 + i * 110)
    }
  }

  render() {
    let mainClass = 'App-skillList';

    if (this.props.isMobile) {
      mainClass += 'mobile';
    }

    return (
      <section className={mainClass}>
        <div></div>
        <ul>
          <li className='App-listPoint'>
            <h3>Javascript</h3>
            <ul className='App-subList'>
              <li>
                React, React Native, Jquery
                </li>
              <li>
                NodeJS, Express
                </li>
              <li>
                ES6, Typescript
              </li>
            </ul>
          </li>
          <li className='App-listPoint'>
            <h3>CSS3</h3>
            <ul className='App-subList'>
              <li>
                Bootstrap
            </li>
              <li>
                Sass, Less
            </li>
            </ul>
          </li>
          <li className='App-listPoint'>
            <h3>HTML5</h3>
            <ul className='App-subList' >
              <li>
                {'<div>Hello World</div>'}
              </li>
            </ul>
          </li>
          <li className='App-listPoint' id="App-microsoftEntry">
            <h3>MS Cloud Services</h3>
            <ul className='App-subList' >
              <li>
                Azure
            </li>
              <li>
                SharePoint Online
            </li>
              <li>
                PowerApps (Canvas)
            </li>
              <li>
                Flow
            </li>
              <li>
                Common Data Services
            </li>
            </ul>
          </li>
          <li className='App-listPoint'>
            <h3>Weitere Spracherfahrung</h3>
            <ul className='App-subList'>
              <li>Python</li>
              <li>C++</li>
              <li>C#</li>
              <li>Java</li>
            </ul>
          </li>
          <li className='App-listPoint'>
            <h3>Datenbanken</h3>
            <ul className='App-subList'>
              <li>
                MySQL
            </li>
              <li>
                MongoDB
            </li>
            </ul>
          </li>
        </ul>
      </section>
    )
  }
}

export default fader(Skills);