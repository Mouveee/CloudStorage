import * as React from 'react';

import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      view: 'main' //possible: 'main', 'cloudstorage', 'about'
    }
  }

  render() {
    let navBarClass = 'App-navBar';
    this.state.visible ? navBarClass += ' App-navBarVisible' : console.log('');
    this.props.isMobile ? navBarClass += ' App-navBarMobile' : console.log('');

    setTimeout(() => this.setState({ visible: true }));

    return (
      <nav className={navBarClass}>
        <span
          className='App-navItem'
          onClick={() => this.props.changeRoute('main')}
        >
          Main
        </span>

        <span
          className='App-navItem'
          onClick={() => this.props.changeRoute('cloudStorage')}
        >
          Files
        </span>

        <span
          className='App-navItem'
          onClick={() => this.props.changeRoute('about')}
        >
          About
        </span>
      </nav >
    )
  }
}

export default Navbar