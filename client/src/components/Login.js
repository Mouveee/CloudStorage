import * as React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: '',
      password: ''
    }
  }

  submitLoginData = async () => {
    const requestBody = this.state;
    const destination = 'http://localhost:5000/login';

    if (this.state.userName.length < 1 || this.state.password.length < 1) {
      alert('i need more information');
    } else {
      const response = await fetch(destination, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": `application/json`,
          Accept: "*/*",
          "Authorization": `Basic ${btoa(`${this.state.userName}:${this.state.password}`)}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
      })

      if (response.status === 200) {
        const parsedResponse = response.json();
        parsedResponse.then(content => {
          this.props.changeUserRole(content.userRole)
        })
      } else if (response.status === 501) {
        alert('wrong credentials');
      } else alert('welcome to hell');
    }
  }

  render() {
    return (
      <div>
        <h1>LOGIN</h1>

        <input
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
          type="text"
          id="App-inputPassword"
          placeholder="Password"
          onChange={e => {
            this.setState({
              password: e.target.value
            })
          }}>
        </input>

        <button onClick={() => this.submitLoginData()}>SEND</button>
      </div>
    );
  }
}

export default Login;