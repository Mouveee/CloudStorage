import * as React from 'react';

import './Main.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    let classMain = this.state.visible ? 'App-mainVisibile' : '';

    if (this.props.isMobile) {
      classMain += ' mobile';
    }

    setTimeout(() => {
      this.setState({ visible: true });
    });

    return (
      <section id='App-mainPage' className={classMain}>
        <h1></h1>

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