import * as React from 'react';

//TODO: create new css file for list
// import './Main.css';

import './Main.css';
import './Skills.css';

import fader from '../HOC/Fader';

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileClass: this.props.isMobile ? ' App-mobile' : ''
    }
  }

  componentDidMount = () => {
    this.fadeInListEntries();
  }

  fadeInListEntries = () => {
    const listEntries = document.getElementsByClassName('App-listPoint');

    for (let i = listEntries.length - 1; i >= 0; i--) {
      setTimeout(() => {
        listEntries[i].className += ' opaque'
      }, 10 + i * 90)
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
        <ul className={'App-skillList' + this.state.mobileClass}>
          <li className={'App-listPoint' + this.state.mobileClass} >
            <h3 className={this.state.mobileClass}>Javascript</h3>
            <ul className={'App-subList' + this.state.mobileClass}>
              <li>
                React
                </li>
              <li>Jquery</li>
              <li>
                NodeJS, Express
                </li>
              <li>
                ES6, Typescript
              </li>
            </ul>
          </li>
          <li className={'App-listPoint' + this.state.mobileClass}>
            <h3 className={this.state.mobileClass}>CSS3</h3>
            <ul className={'App-subList' + this.state.mobileClass}>
              <li>
                Bootstrap
            </li>
              <li>
                Sass, Less
            </li>
            </ul>
          </li>
          <li className={'App-listPoint' + this.state.mobileClass}>
            <h3 className={this.state.mobileClass}>HTML5</h3>
            <ul className={'App-subList' + this.state.mobileClass}>
              <li>
                {'<div>Hello World</div>'}
              </li>
            </ul>
          </li>
          <li className={'App-listPoint' + this.state.mobileClass} id="App-microsoftEntry">
            <h3 className={this.state.mobileClass}>MS Cloud Services</h3>
            <ul className={'App-subList' + this.state.mobileClass}>
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
          <li className={'App-listPoint' + this.state.mobileClass}>
            <h3 className={this.state.mobileClass}>Weitere Spracherfahrung</h3>
            <ul className={'App-subList' + this.state.mobileClass}>
              <li>Python</li>
              <li>C++</li>
              <li>C#</li>
              <li>Java</li>
            </ul>
          </li>
          <li className={'App-listPoint' + this.state.mobileClass}>
            <h3 className={this.state.mobileClass}>Datenbanken</h3>
            <ul className={'App-subList' + this.state.mobileClass}>
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