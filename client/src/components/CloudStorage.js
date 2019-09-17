import * as React from 'react';

class CloudStorage extends React.Component {
  constructor(props) {
    super(props);

    //toggles FilePond Menus visibility
    this.changeUploadVisibility.bind(this);

    //clears selected item array after moving of multiple files
    this.clearSelectedItems.bind(this);

    //sets the file being dragged to parents state
    this.setFileBeingDragged.bind(this);

    this.sortBy.bind(this);

    this.setState.bind(this);

    this.state = {
      currentFolder: "./",
      prevFolder: [],
      fileList: [],
      fileBeingDragged: '',
      finishedItems: [], //to display for download
      folderList: [],
      inProgress: [],
      selectedItems: [],
      sorting: "name", //possible so far: 'name',
      statusOverlayVisible: false,
      statusOverlayMessage: 'Please Wait...',
      updating: false,
      uploadMenuVisible: false,
      view: 'list' //TODO: add grid and set as default for mobile
      //TODO factorize the whole table
    };

    this.state = {
      userRole: 'user',

    }
  }

  render() {
    return <div>this will be the storage container</div>
  }
}

export default CloudStorage;