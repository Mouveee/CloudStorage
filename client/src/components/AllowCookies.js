import * as React from 'react';
import './AllowCookies.css';

class AllowCookies extends React.Component {
  render() {
    console.log('its rendering')
    return (
      <div id='App-allowCookieDialogue'>Diese Seite nutzt Cookies,
        um die Bedienbarkeit und Sicherheit dieser Seite zu steigern. Stimmen
        Sie der Verwendung von Cookies zu?
        <div
          onClick={() => this.props.setCookieAllowance(true)}
          className='App-btnCookie'>
          JA
        </div>
        <div
          onClick={() => this.props.setCookieAllowance(false)}
          className='App-btnCookie'>
          NEIN
        </div>
      </div>
    )
  }
}

export default AllowCookies;

