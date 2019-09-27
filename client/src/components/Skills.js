import * as React from 'react';

//TODO: create new css file for list
import './Main.css';
import { setTimeout } from 'core-js';

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    setTimeout(() => this.setState({ visible: true }))

    return (
      <ul id='App-mainPage' className={this.state.visible ? 'App-mainVisibile' : ''}>
        <li>
          Javascript
        </li>
        <li>
          CSS
          </li>
        <li>
          HTML
        </li>
      </ul>);
  }
}

export default Skills;