import * as React from 'react';

import SideBar from './Sidebar.js';
import Skills from './Skills.js';

import './Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      route: 'main' //main, biography, skills 
    }

    this.setVisiblePage.bind(this);
  }

  setVisiblePage = route => {
    if (this.state.route !== route) {
      this.setState({ route: route });
    }
  }

  render() {
    let classMain = this.state.visible ? 'App-mainVisibile' : 'dummyClass';
    let classHead = this.props.isMobile ? 'App-headMobile' : 'App-head';

    if (this.props.isMobile) {
      classMain += ' mobile';
    };

    setTimeout(() => this.setState({ visible: true }))

    return ((() => {
      switch (this.state.route) {
        case 'main':
          return (
            <div
              id='App-mainPage'
              className={classMain}
            >

              <h1 className={classHead} id='App-mainHeader'>
                Welcome
              </h1>

              <SideBar
                isMobile={this.props.isMobile}
                setVisiblePage={this.setVisiblePage}
              />

              <div className='App-mainText'>
                Hi there,
                <br></br>
                <br></br>
                my name is Marco Huwig, I'm a middle-aged Web Developer from Saarland, Germany. I've created this page to show
                you my skills in developing web presences. In this case, I used the probably most popular Javascript-Frontend Library there is now,
                <em> ReactJS</em>. Additionally, you'll find my Lebenslauf and some of my knowlodge I've gained so far...

              </div>

            </ div>
          );
          break;
        case 'skills':
          return (
            <div
              id='App-mainPage'
              className={classMain}
            >
              <SideBar
                isMobile={this.props.isMobile}
                setVisiblePage={this.setVisiblePage}
              />
              <Skills />
            </div>
          );
        default:
          return (
            <div id='App-mainPage'
              className={classMain}
            >
              <SideBar
                isMobile={this.props.isMobile}
                setVisiblePage={this.setVisiblePage}
              />
              Page not found :(
            </div>
          );
      }
    })())
  }
}

export default Main;