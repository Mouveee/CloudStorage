import * as React from 'react';



class AllowCookies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookiesAllowed: false,
      visible: true
    }

    if (this.props.isMobile) {
      import('./AllowCookies-mobile.css').then();
    } else {
      import('./AllowCookies.css').then();
    }
  }

  fadeOut = () => {
    document.getElementById('App-cookieConfirmationContainer').style.opacity = 0;
  }

  handleClick(decision) {
    this.fadeOut();
    this.props.setCookieAllowance(decision);
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

