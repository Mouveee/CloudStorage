import * as React from 'react';

class GridItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { checked: false }
  }

  render() {
    return (<div>this will be a grid item</div>)
  }
}

export default GridItem;