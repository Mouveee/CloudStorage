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
          <ul>
            <li>React, ES6, Jquery</li>
            <li>NodeJS, Express</li>
          </ul>
        </li>
        <li>
          CSS
          <ul>
            <li>
              Bootstrap
            </li>
            <li>
              Sass, Less
            </li>
          </ul>
        </li>
        <li>
          HTML
        </li>
      </ul>);
  }
}

export default Skills;