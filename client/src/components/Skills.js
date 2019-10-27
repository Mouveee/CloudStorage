import * as React from 'react';

//TODO: create new css file for list
import './Main.css';

import fader from '../HOC/Fader';

class Skills extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mainClass = '';

    if (this.props.isMobile) {
      mainClass += 'mobile';
    }

    return (
      <section id='App-mainPage' className={mainClass}>
        <h1></h1>
        <ul >
          <li>
            Javascript
          <ul>
              <li>React, ES6, Jquery</li>
              <li>NodeJS, Express</li>
            </ul>
          </li>
          <li>
            CSS
          <ul>
              <li>
                Bootstrap
            </li>
              <li>
                Sass, Less
            </li>
            </ul>
          </li>
          <li>
            HTML
        </li>
          <li>
            MS Cloud Services
          <ul>
              <li>
                MS Azure
            </li>
              <li>
                MS SharePoint
            </li>
              <li>
                MS PowerApps (Canvas)
            </li>
              <li>
                MS Flow
            </li>
            </ul>
          </li>
          <li>
            C++
        </li>
          <li>
            C#
        </li>
        </ul>
      </section>
    )
  }
}

export default fader(Skills);