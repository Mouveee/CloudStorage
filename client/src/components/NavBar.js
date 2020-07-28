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

  handleVisibleMenuEntries = () => {
    setTimeout(() => {
      const element = document.getElementById(`App-${this.props.route}`)
      let hiddenButton = document.getElementsByClassName('hiddenNavItem')[0]

      if (hiddenButton) {
        hiddenButton.classList.remove('hiddenNavItem')
      }

      element.classList.add('hiddenNavItem')
    }, 600)
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
          id={'App-main'}
          onClick={() => {
            this.props.changeRoute('main')
            this.handleVisibleMenuEntries()
          }}
        >
          Start
      </span>

        <span
          className={`App-navItem ${this.state.mobileClass}`}
          id={'App-skills'}
          onClick={() => {
            this.props.changeRoute('skills')
            this.handleVisibleMenuEntries()
          }}
        >
          Kenntnisse
      </span>

        <span
          className={`App-navItem ${this.state.mobileClass}`}
          id={'App-about'}
          onClick={() => {
            this.props.changeRoute('about')
            this.handleVisibleMenuEntries()
          }}
        >
          Kontakt
      </span>

        <div
          className={`App-navItem ${this.state.mobileClass}`}
          id={'App-biography'}
          onClick={() => {
            this.props.changeRoute('biography')
            this.handleVisibleMenuEntries()
          }}
        >
          Über Mich
      </div>
      </div>
    )
  }
}

export default NavBar;