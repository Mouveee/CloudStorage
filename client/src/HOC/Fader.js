import * as React from 'react';

const fader = (WrappedComponent) => {
  return class Fader extends React.Component {
    constructor(props) {
      super(props);

      this.state = { visible: false };
    }

    componentDidMount = () => {
      console.log('mounted fader')

      this.setState({ visible: true }, () => console.log('done, ' + this.state.visible))

      console.log(this.state.visible)
    }

    render() {
      const test = this.state;
      return <WrappedComponent {...this.props} visible={test} />
    }
  }
}

export default fader;