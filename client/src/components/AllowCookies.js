import * as React from 'react';
import './AllowCookies.css';

class AllowCookies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: this.props.cookiesAllowed ? 1 : 0,
      visible: true
    }
  }

  componentDidMount = () => {
    if (this.state.question === 1) {
      document.getElementById('App-infoText').innerHTML = 'Seite im Vollbild darstellen?';
    }
    alert(this.state.question === 1 ? 'allowed' : 'not allowed')
  }

  fadeOut = () => {
    document.getElementById('App-cookieConfirmationContainer').style.opacity = 0;
  }

  handleClick(decision) {
    if (this.state.question === 0) {
      this.props.setCookieAllowance(decision)
      document.getElementById('App-infoText').innerHTML = 'Seite im Vollbild darstellen?';
      this.setState({ question: this.state.question + 1 })
    } else {
      this.fadeOut();
      if (decision) this.props.setFullScreen();
    }
  }

  render() {
    return (
      <div id='App-cookieConfirmationContainer'>
        <div id='App-overlay'>
        </div>
        <div id='App-allowCookieDialogue'>
          <div >
            <span id='App-infoText'>
              Diese Seite nutzt Cookies,
              um die Bedienbarkeit und Sicherheit dieser Seite zu steigern.
              Der Verwendung von Cookies zustimmmen?
            </span>
            <br></br>

            <div
              onClick={() => this.handleClick(true)}
              className='App-btnCookie'>
              JA
            </div>
            <div
              onClick={() => this.handleClick(false)}
              className='App-btnCookie'>
              NEIN
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default AllowCookies;

