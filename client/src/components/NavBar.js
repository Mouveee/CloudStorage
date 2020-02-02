import * as React from 'react';

import './NavBar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let navBarClass = 'App-navBar';

    if (this.state.visible) {
      navBarClass += ' App-navBarVisible';
      navBarClass += this.props.isMobile ? ' mobileHeader' : '';
    }

    return (
      <div className={navBarClass}>
        <span
          className='App-navItem'
          onClick={() => this.props.changeRoute('main')}
        >
          Start
      </span>

        <span
          className='App-navItem'
          onClick={() => this.props.changeRoute('cloudStorage')}
        >
          Downloads
      </span>

        <span
          className='App-navItem'
          onClick={() => this.props.changeRoute('about')}
        >
          Kontakt
    </span>
      </div>
    )
  }
}

export default NavBar;