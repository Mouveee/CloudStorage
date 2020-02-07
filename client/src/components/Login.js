import * as React from 'react';

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitButtonVisible: false,
      cookiesAllowed: this.props.allowCookies,
      userName: '',
      password: ''
    }
  }

  toggleSubmitButton = () => {
    const button = document.getElementById('App-loginButton')

    button.style.display = !this.state.submitButtonVisible ? 'block' : 'none';

    setTimeout(() => {
      if (this.state.submitButtonVisible) {
        button.classList.replace('hidden', 'visible');
      } else {
        button.classList.replace('visible', 'hidden');
      }
    }, 20)

    this.setState({ submitButtonVisible: !this.state.submitButtonVisible })
    console.log(button.classList)
  }

  submitLoginData = async () => {
    let requestBody = {};
    requestBody = Object.assign(requestBody, this.state);

    console.log('body of request: \n' + JSON.stringify(requestBody))

    if (this.state.userName.length < 1 || this.state.password.length < 1) {
      alert('i need more information');
    } else {
      const response = await this.props.callBackend('./login', requestBody)

      if (response.status === 200) {
        const parsedResponse = response.json();
        parsedResponse.then(content => {
          this.props.changeUserRole(content.userRole);
          document.onkeypress = null;
        })
      } else if (response.status === 401) {
        alert('wrong credentials');
      } else alert('welcome to hell');
    }
  }

  addKeyUpEvent = function addEvent(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitLoginData();
    }
  }

  componentDidMount() {
    document.onkeypress = e => this.addKeyUpEvent(e)
  }


  render() {
    return (
      <div id='App-loginScreen'>
        <h1 id='App-loginHead'>ANMELDUNG</h1>

        <input
          autoComplete="true"
          className="App-loginInput question"
          type="email"
          id='App-inputName'
          placeholder="Name"
          onChange={e => {
            this.setState({
              userName: e.target.value
            }
            )
            if ((this.state.userName.length > 0 && this.state.password.length > 0) && !this.state.submitButtonVisible) {
              this.toggleSubmitButton()
            } else if ((this.state.userName.length === 0 || this.state.password.length === 0) && this.state.submitButtonVisible) {
              this.toggleSubmitButton()
            }
          }}>
        </input>

        <input
          className="App-loginInput question"
          type="password"
          id="App-inputPassword"
          placeholder="Password"
          onChange={e => {
            this.setState({
              password: e.target.value
            })
            if ((this.state.userName.length > 0 && this.state.password.length > 0) && !this.state.submitButtonVisible) {
              this.toggleSubmitButton()
            } else if ((this.state.userName.length === 0 || this.state.password.length === 0) && this.state.submitButtonVisible) {
              this.toggleSubmitButton()
            }
          }}>
        </input>

        <div id='App-loginButton' className='hidden' onClick={() => this.submitLoginData()}>LOGIN</div>
      </div>
    );
  }
}

export default Login;