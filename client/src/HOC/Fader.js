import * as React from 'react';

const fader = (WrappedComponent) => {
  return class Fader extends React.Component {
    constructor(props) {
      super(props);

      this.state = { visible: false };
    }

    componentDidMount = () => {
      this.setState({ visible: true }, () => console.log('done, ' + this.state.visible))
    }

    render() {
      const faderVisibility = this.state.visible ? 'visible' : 'invisible';
      return <WrappedComponent {...this.props} visible={this.state.visible} className={faderVisibility} id='App-wrapper' />
    }
  }
}

export default fader;