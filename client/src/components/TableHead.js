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
              draggable='false'
              onDragOver={e => {
                e.preventDefault();
                console.log('being triggered')
              }}
              onDrop={async e => {
                e.preventDefault();

                console.log(`triggered, file ${this.props.fileBeingDragged}`)
                console.log(`prevFolder: ${this.props.prevFolder}`)

                const content = {};

                content.itemToMove = this.props.currentFolder + this.props.fileBeingDragged;
                content.targetFolder = this.props.prevFolder;

                this.props.setFileBeingDragged({ fileBeingDragged: "" });
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