import * as React from 'react';

import Biography from './Biography.js';
import EntryPage from './EntryPage.js';
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

    this.timeOut = null;
  }

  componentWillUnmount = () => { clearTimeout(this.timeOut) }

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

    this.timeOut = setTimeout(() => this.setState({ visible: true }));

    return (


      <div
        id='App-mainPage'
        className={classMain}
      >
        <SideBar
          isMobile={this.props.isMobile}
          setVisiblePage={this.setVisiblePage}
        />

        {/* self invoking function, switch cases handle routing */}
        {(() => {
          switch (this.state.route) {
            case 'main':
              return <EntryPage
                isMobile={this.props.isMobile}
              />
            case 'skills':
              return <Skills
                isMobile={this.props.isMobile}
              />
            case 'biography':
              return <Biography
                isMobile={this.props.isMobile}
              />
            default: return (<div>Page not found :(</div>)
          }
        })()
        }

      </div>
    );
  }
}

export default Main;


