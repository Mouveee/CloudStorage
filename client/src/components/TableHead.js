import React from 'react';

import "./TableHead.css";

class TableHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }


  render() {
    const visibility = this.state.visible ? 'visible' : 'chica';
    setTimeout(() => this.setState({ visible: true }))

    return (
      <thead id='App-tableHead' className={visibility}>
        <tr >
          <th />
          <th />
          <th
            className='App-columnName'
            onClick={this.props.sortBy}
            data-sort='name'
          >
            Name
          </th>
        </tr>
        {!this.props.root ?
          <tr >
            <th />
            <th />
            <th
              className='App-columnName'
              onClick={this.props.navigateBack}
            >
              ...
          </th>
          </tr>
          : null
        }
      </thead>)
  }
}

export default TableHead;