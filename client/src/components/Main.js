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

    return (


      <div
        id='App-mainPage'
        className={classMain}
      >
        <SideBar
          isMobile={this.props.isMobile}
          setVisiblePage={this.setVisiblePage}
        />

        {/* self invoking function, switch handles routing */}
        {(() => {
          switch (this.state.route) {
            case 'main':
              return <EntryPage
                isMobile={this.props.isMobile}
              />
              break;
            case 'skills':
              return <Skills
                isMobile={this.props.isMobile}
              />
              break;
            case 'biography':
              return <Biography
                isMobile={this.props.isMobile}
              />
              break;
            default: return (<div>Page not found :(</div>)
          }
        })()
        }

      </div>
    );
  }
}

export default Main;
/* return ((() => {
        //   switch (this.state.route) {
        //     case 'main':
        //       return (
        //         <div
        //           id='App-mainPage'
        //           className={classMain}
        //         >


        //       break;
        //     case 'skills':
        //       return (
        //         <div
        //           id='App-mainPage'
        //           className={classMain}
        //         >
        //           <SideBar
        //             isMobile={this.props.isMobile}
        //             setVisiblePage={this.setVisiblePage}
        //           />
        //           <Skills />
        //         </div>
        //       );
        //     case 'biography':
        //       return <Biography />
        //       break;
        //     default:
        //       return (
        //         <div id='App-mainPage'
        //           className={classMain}
        //         >
        //           <SideBar
        //             isMobile={this.props.isMobile}
        //             setVisiblePage={this.setVisiblePage}
        //           />
        //           Page not found :(
        //         </div>
        //       );
        //   }
        // })())
      } */


