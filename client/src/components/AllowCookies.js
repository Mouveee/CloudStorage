import * as React from 'react';
import './AllowCookies.css';

class AllowCookies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    }
  }

  fadeOut = () => {
    document.getElementById('App-cookieConfirmationContainer').style.opacity = 0;
  }

  handleClick(decision) {
    this.fadeOut();
    setTimeout(() => this.props.setCookieAllowance(decision), 1200)
  }

  render() {
    console.log('its rendering')
    return (
      <div id='App-cookieConfirmationContainer'>
        <div id='App-overlay'>
        </div>
        <div id='App-allowCookieDialogue'>
          <div>
            Diese Seite nutzt Cookies,
            um die Bedienbarkeit und Sicherheit dieser Seite zu steigern. Stimmen
            Sie der Verwendung von Cookies zu?
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

