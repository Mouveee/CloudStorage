import * as React from 'react';

//TODO: create new css file for list
import './Main.css';
import './Skills.css';

import fader from '../HOC/Fader';

class Skills extends React.Component {

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
            Javascript
          <ul className='App-subList'>
              <li>
                React, React Native, Jquery
                </li>
              <li>
                NodeJS, Express
                </li>
            </ul>
          </li>
          <li className='App-listPoint'>
            CSS3
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
            HTML5
        </li>
          <li className='App-listPoint'>
            MS Cloud Services
          <ul className='App-subList'>
              <li>
                Azure
            </li>
              <li>
                SharePoint
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
            C++
        </li>
          <li className='App-listPoint'>
            C#
        </li>
        </ul>
      </section>
    )
  }
}

export default fader(Skills);