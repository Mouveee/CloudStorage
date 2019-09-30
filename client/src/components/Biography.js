import * as React from 'react';

class Biography extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false }
  }

  render() {
    setTimeout(() => this.setState({ visible: true }));

    return (
      <div
        id='App-mainPage'
        className={this.state.visible ? 'App-mainVisibile' : ''}
      >
        <h1>Lebenslauf</h1>
      </div>
    )
  }
}

export default Biography;