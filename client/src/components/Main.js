import * as React from 'react';

//HOC, hope this works
import fader from '../HOC/Fader'

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
      route: 'main', //main, biography, skills 
    }

    this.setVisiblePage.bind(this);

    this.timeOut = null;
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ visible: true }), 10)
  }

  setVisiblePage = route => {
    if (this.state.route !== route) {
      this.setState({ visible: false });
      setTimeout(() => this.setState({ route: route }), 600);
      setTimeout(() => this.setState({ visible: true }), 650);
    }
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

        {/* self invoking function, switch cases handle routing */}
        <SideBar
          isMobile={this.props.isMobile}
          setVisiblePage={this.setVisiblePage}
        />
        <section id='App-subPageContainer' className={classSub}>
          {(() => {
            switch (this.state.route) {

              case 'main':
                return <EntryPage
                  changeRoute={this.props.changeRoute}
                  isMobile={this.props.isMobile}
                  setVisiblePage={this.setVisiblePage}
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


