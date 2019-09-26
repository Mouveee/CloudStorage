import * as React from 'react';

class MobileButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false //toggles display of control buttons in the list
    }
  }

  toggleVisible = () => this.setState({ clicked: !this.state.clicked });

  render() {
    return (
      <button onClick={this.toggleVisible}>
        X
      </button>);
  }
}

export default MobileButton;
