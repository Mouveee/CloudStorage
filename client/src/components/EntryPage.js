import * as React from 'react';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    let classHead = this.props.isMobile ? 'App-headMobile' : 'App-head';
    setTimeout(() => this.setState({ visible: true }));

    return (
      <section
        id='App-mainPage'
        className={this.state.visible ? 'App-mainVisibile' : ''}
      >
        <h1 className={classHead} id='App-mainHeader'>
          Welcome
      </h1>

        <div className='App-mainText'>
          Hi there,
        <br></br>
          <br></br>
          my name is Marco Huwig, I'm a middle-aged Web Developer from Saarland, Germany. I've created this page to show
          you my skills in developing web presences. In this case, I used the probably most popular Javascript-Frontend Library there is now,
        <em> ReactJS</em>. Additionally, you'll find my Lebenslauf and some of my knowlodge I've gained so far...
      </div>
      </ section>
    )
  }
}

export default EntryPage;

