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
      <td>
        <button onClick={this.toggleVisible}>
          X
        </button>
      </td>
    )
  }
}

export default MobileButton;
