import * as React from 'react';

import './NavBar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileClass: this.props.isMobile ? 'App-mobile' : '',
      visible: false
    }
  }

  componentDidMount = () => {
    this.setState({ visible: true });
  }

  render() {
    let navBarClass = 'App-navBar';

    if (this.state.visible) {
      navBarClass += ' visible';
      navBarClass += ' ' + this.state.mobileClass;
    }

    return (
      <div className={navBarClass}>
        <span
          className={`App-navItem ${this.state.mobileClass}`}
          onClick={() => this.props.changeRoute('main')}
        >
          Start
      </span>

        <span
          className={`App-navItem ${this.state.mobileClass}`}
          onClick={() => this.props.changeRoute('cloudStorage')}
        >
          Downloads
      </span>

        <span
          className={`App-navItem ${this.state.mobileClass}`}
          onClick={() => this.props.changeRoute('about')}
        >
          Kontakt
    </span>
      </div>
    )
  }
}

export default NavBar;