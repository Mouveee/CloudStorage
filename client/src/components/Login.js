import * as React from 'react';

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cookiesAllowed: this.props.allowCookies,
      userName: '',
      password: ''
    }
  }


  submitLoginData = async () => {
    let requestBody = {};
    requestBody = Object.assign(requestBody, this.state);

    if (this.state.userName.length < 1 || this.state.password.length < 1) {
      alert('i need more information');
    } else {
      const response = await this.props.callBackend('./login', requestBody)

      if (response.status === 200) {
        const parsedResponse = response.json();
        parsedResponse.then(content => {
          this.props.changeUserRole(content.userRole);
          document.removeEventListener('keyup', this.addKeyUpEvent)
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
      document.onkeypress = null;
    }
  }

  componentDidMount() {
    document.onkeypress = e => this.addKeyUpEvent(e)
  }

  UNSAFE_componentWillMount() {
    console.log('unmounting')
  }


  render() {
    return (
      <div>
        <h1>LOGIN</h1>

        <input
          autoComplete="true"
          className="App-loginInput"
          type="text"
          id='App-inputName'
          placeholder="Name"
          onChange={e => {
            this.setState(
              {
                userName: e.target.value
              }
            )
          }}>
        </input>

        <input
          className="App-loginInput"
          type="password"
          id="App-inputPassword"
          placeholder="Password"
          onChange={e => {
            this.setState({
              password: e.target.value
            })
          }}>
        </input>

        <div id='App-loginButton' onClick={() => this.submitLoginData()}>SEND</div>
      </div>
    );
  }
}

export default Login;