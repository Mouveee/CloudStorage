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
      <thead id='App-tableHead' className={this.props.isMobile ? visibility + ' mobileTableHead' : visibility}>
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
              draggable='false'
              onDragOver={e => {
                e.preventDefault();
              }}
              onDrop={async e => {
                e.preventDefault();

                const content = {};

                content.itemToMove = Object.keys(this.props.selectedItems).length === 0 ? {
                  key: {
                    name: this.props.fileBeingDragged[Object.keys(this.props.fileBeingDragged)[0]].name,
                    type: this.props.type
                  }
                }
                  : this.props.selectedItems;

                content.targetFolder = './external/' + this.props.prevFolder[this.props.prevFolder.length - 1].slice(2);

                this.props.setFileBeingDragged({ fileBeingDragged: {} });
                this.props.clearSelectedItems();

                let responsePromise = await this.props.callBackendAPI(
                  content,
                  "/move"
                );
                const response = responsePromise.json();

                //reload folder
                response.then(resolved => this.props.actualize());
              }
              }
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