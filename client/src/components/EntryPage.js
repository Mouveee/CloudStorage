import * as React from 'react';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let classHead = this.props.isMobile ? 'App-headMobile' : 'App-head';

    let mainClass = '';
    if (this.state.visible) {
      mainClass += 'App-mainVisibile';
    }

    if (this.props.isMobile) {
      mainClass += ' mobile';
    }

    return (
      <section
        id='App-mainPage'
        className={mainClass}
      >
        <div className={classHead} id='App-mainHeader'>

        </div>

        <section className='App-mainText'>
          Hi,
          <br></br>
          <br></br>
          my name is Marco&nbsp;Huwig. I am a Full Stack Web Developer with a lot of skills. I see my motivation in programming
          as a one of kind problem solver. If you don't like me, fuck off. If you like me, fuck off anyway.
          <br></br>
          I hate the police and taxmen. I love drugs and vinyl.<br></br>
          Call me, I won't respond anyway.<br></br>
        </section>
      </ section>
    )
  }
}

export default EntryPage;

