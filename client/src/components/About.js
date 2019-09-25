import * as React from 'react';

import './Main.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    let classMain = this.state.visible ? 'App-mainVisibile' : 'dummyClass';

    setTimeout(() => {
      this.setState({ visible: true });
    });

    return (
      <section id='App-mainPage' className={classMain}>
        <div>Marco Huwig</div>
        <div>GaerntnerStrasse 31</div>
        <div><br></br></div>
        <div>66117 Saarbrooklyn</div>
        <div><small>2019, year of the weasel</small></div>
      </section>
    )
  }
}

export default About;