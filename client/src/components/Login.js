import * as React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: 'test',
      password: 'passtest'
    }
  }

  submitLoginData = async (name, password) => {
    const requestBody = this.state;
    const destination = 'http://localhost:5000/login';

    const response = await fetch(destination, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": `application/json`,
        Accept: "*/*"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
    });
    // this.props.changeUserRole('admin');
  }

  render() {
    return (
      <div>
        <h1>LOGIN SCREEN</h1>
        <input type="text" placeholder="Name"></input>
        <input type="text" placeholder="Password"></input>
        <button onClick={() => this.submitLoginData(this.state.name, this.state.password)}>SEND</button>
      </div>
    );
  }
}

export default Login;