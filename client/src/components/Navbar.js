import * as React from 'react';

import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'main' //possible: 'main', 'cloudstorage', 'about'
    }
  }

  render() {
    return (
      <nav className='App-navBar'>
        <span className='App-navItem'>Main</span>
        <span className='App-navItem'>Files</span>
        <span className='App-navItem'>About</span>
      </nav>
    )
  }
}

export default Navbar