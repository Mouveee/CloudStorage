import * as React from 'react';
import SideBar from './SideBar.js';

import './SideBar.css';
import './Main.css';

class About extends React.Component {
  render() {
    let classMain = 'App-mainVisible';

    if (this.props.isMobile) {
      classMain += ' mobile';
    }

    return (
      <section id='App-mainPage' className={classMain}>
        <SideBar
          changeRoute={this.props.changeRoute}
          isMainRoute={false}
          isMobile={this.props.isMobile}
          setVisiblePage={this.props.setVisiblePage}
        />

        <div>Marco Huwig</div>
        <div>Gärtnerstraße 31</div>
        <div><br></br></div>
        <div>66117 Saarbrücken</div>

        <div><small>2020</small></div>

        <a className="App-clickable" href='mailto:huwig.marco@gmail.com'>huwig.marco@gmail.com</a>
      </section>
    )
  }
}

export default About;