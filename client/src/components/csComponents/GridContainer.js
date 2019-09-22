import * as React from 'react';



class GridContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;

  }

  render() {
    return (
      <div key="a">a</div>
    )
  }
}

export default GridContainer;