import * as React from 'react';

import './Main.css';

class About extends React.Component {
  render() {
    let classMain = 'App-mainVisible';

    if (this.props.isMobile) {
      classMain += ' mobile';
    }

    return (
      <section id='App-mainPage' className={classMain}>

        <div>Marco Huwig</div>
        <div>Gärtnerstraße 31</div>
        <div><br></br></div>
        <div>66117 Saarbrücken</div>

        <div><small>2019</small></div>

        <a href='mailto:huwig.marco@gmail.com'>huwig.marco@gmail.com</a>
      </section>
    )
  }
}

export default About;