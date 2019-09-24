import * as React from 'react';

import './Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    const visibility = this.state.visible ? 'App-mainVisibile' : 'dummyClass';
    this.props.mobile ? visibility += ' mobile' : console.log('');
    setTimeout(() => this.setState({ visible: true }))

    return (
      <div
        id='App-mainPage'
        className={visibility}
      >
        <h1>
          Welcome
        </h1>
        <div className='App-mainText'>Hi there,<br></br> my name is Marco Huwig, I'm a middle-aged Web Developer from Saarland, Germany. I've created this page to show
        you my skills in developing web presences. In this case, I used the probably most popular Javascript-Frontend Library there is now,
        <em> ReactJS</em>. Additionally, you'll find my Lebenslauf and some of my knowlodge I've gained so far...</div>
      </div>
    )
  }
}

export default Main;