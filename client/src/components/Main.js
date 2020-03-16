import * as React from 'react';

//HOC
import fader from '../HOC/Fader'

import Biography from './Biography.js';
import EntryPage from './EntryPage.js';
import SideBar from './SideBar.js';
import Skills from './Skills.js';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      route: this.props.visiblePage //main, biography, skills 
    }

    if (this.props.isMobile)
      import('./Main-mobile.css').then();
    else import('./Main.css').then();

    this.timeOut = null;
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ visible: true }), 10)
  }

  render() {
    let classMain = '';
    let classSub = '';

    if (this.state.visible) { classSub = ' visible' } else { classSub = 'invisible' };

    if (this.props.isMobile) {
      classMain += ' mobile';
    };

    return (

      <div
        id='App-mainPage'
        className={classMain}
      >

        <SideBar
          isMainRoute={true}
          isMobile={this.props.isMobile}
          setVisiblePage={this.props.setVisiblePage}
          visiblePage={this.state.visiblePage}
        />

        <section id='App-subPageContainer' className={classSub}>
          {/* self invoking function, switch cases handle routing */}
          {(() => {
            switch (this.props.visiblePage) {

              case 'main':
                return <EntryPage
                  changeRoute={this.props.changeRoute}
                  isMobile={this.props.isMobile}
                  setVisiblePage={this.props.setVisiblePage}
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
        </section>
      </div>
    );
  }
}

export default fader(Main);


