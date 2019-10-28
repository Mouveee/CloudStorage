import * as React from 'react';

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

import './CloudStorage.css';

import ControlFooter from "./csComponents/ControlFooter.js";
import GridContainer from './csComponents/GridContainer.js';
import ListItem from "./csComponents/ListItem.js";
import ProgressIndicator from './csComponents/ProgressIndicator.js';
import StatusOverlay from "./csComponents/StatusOverlay.js";
import TableHead from './csComponents/TableHead.js';
import WaitingScreen from './csComponents/WaitingScreen.js';

import waitIcon from "../img/wait.gif";


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
      selectedItems: {},
      sorting: "name", //possible so far: 'name',
      statusOverlayVisible: false,
      statusOverlayMessage: 'Please Wait...',
      updating: false,
      uploadMenuVisible: false,
      view: 'list' //TODO: add grid and set as default for mobile
      //TODO factorize the whole table
    };
  }

  actualize = () => {
    this.requestFolder(this.state.currentFolder);
  };

  callBackendAPI = async (content, destination) => {
    let requestBody = {};
    requestBody.content = content;

    if (!destination) destination = "./external";

    const response = await fetch(destination, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": `application/json`,
        Accept: "*/*"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(requestBody) // body data type must match "Content-Type" header
    });

    return response;
  };

  changeUploadVisibility = () => {
    this.setState({ uploadMenuVisible: !this.state.uploadMenuVisible });
  };

  changeView = viewType => {
    this.setState({ view: viewType });
  }

  clearSelectedItems = () => {
    this.setState({ selectedItems: {} })
  }

  createFolder = async inputFolder => {
    const folder = this.state.currentFolder + inputFolder.value;

    if (folder.length > 0) {
      let response = this.callBackendAPI(folder, "/createfolder");

      this.requestFolder(this.state.currentFolder);

      inputFolder.value = "";
    }
  };

  //item is exprcted to be an array to allow mullitple deletions at once
  deleteItem = async (items, preconfirmed) => {
    const confirmed = preconfirmed || window.confirm(Object.keys(items).length === 1 ?
      `delete ${items[Object.keys(items)[0]].name}?` :
      `delete ${Object.keys(items).length} items?`);

    if (confirmed) {
      this.setState({ updating: true, selectedItems: {} });
      await this.callBackendAPI(items, "/delete");
      this.actualize();
      this.setState({ updating: false, selectedItems: {} });
    }
  }

  downloadFolder = async folder => {
    // TODO: put open download requests in a stack
    if (this.state.inProgress.length > 0) {
      alert('please wait, already zipping');
      return;
    }

    const content = {};
    content.folder = folder.slice(2);

    this.setState({ inProgress: [...this.state.inProgress, folder] })

    let res = await this.callBackendAPI(content, '/downloadFolder');
    console.log(`response.status : ${res.status}`);

    res.json().then(response => {
      this.setState({
        finishedItems: [...this.state.finishedItems, this.state.inProgress[this.state.inProgress.length - 1]],
        inProgress: []
      });
    })
  }

  finishZipping = () => {
    this.setState({ inProgress: [], finishedItems: [] })
  }

  handleFileClick = async (file, folder) => {
    let fileName = "unknown.dat";

    new Promise(async (resolve, reject) => {
      let answer = await fetch("/download", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*"
          // 'Content-Type': 'application/x                                                                                                   -www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({
          folder: folder,
          file: file
        }) // body data type must match "Content-Type" header
      });

      resolve(answer)
    })
      .then(response => {
        fileName = response.headers.get("File");
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        //Append to html page
        document.body.appendChild(link);
        //Force download
        link.click();
        //Clean up and remove the link
        link.parentNode.removeChild(link);
        this.setState({ inProgress: [] })
        return true;
      })
      .catch(e => {
        console.log(`error in promise: ${e}`);
      });
  };

  handleFolderClick = e => {
    console.log('clicked folder');

    let prev = [...this.state.prevFolder, this.state.currentFolder]

    this.setState({
      currentFolder: this.state.currentFolder + e.target.textContent + "/",
      prevFolder: prev,
      selectedItems: {}
    });

    this.requestFolder(this.state.currentFolder + e.target.textContent);
  };


  //TODO: length of keys should be 0 if no items are checked
  itemSelect = async (e, name, type) => {
    const item = {}

    console.log(`type received: ${e}`)

    item.name = './external/' + this.state.currentFolder.slice(2) + name;
    item.type = type;

    let copiedSelectedItems = {};
    Object.assign(copiedSelectedItems, this.state.selectedItems);

    if (e.target.checked) {
      copiedSelectedItems[item.name] = item;

      await this.setState({
        selectedItems: copiedSelectedItems
      });
    } else {
      copiedSelectedItems[item.name] = undefined;

      await this.setState({
        selectedItems: copiedSelectedItems
      });
    }
  };

  navigateBack = async () => {
    if (this.state.prevFolder.length > 0) {
      let prevFolder = [...this.state.prevFolder];
      prevFolder.pop();

      await this.setState({
        currentFolder: this.state.prevFolder[this.state.prevFolder.length - 1],
        prevFolder: prevFolder,
        selectedItems: {}
      });

      this.actualize();
    }
  };

  normalizeItem = item => {
    item = item.replace(/"/g, "").replace(/\//g, "");
    return item;
  };

  renameItem = async item => {
    console.log('renaming item ' + item);

    let newName = prompt('Enter the new name', item);

    const content = {};
    content.oldName = this.state.currentFolder + item;
    content.newName = this.state.currentFolder + newName;

    let answer = await this.callBackendAPI(content, '/rename');

    answer.status === 200 ?
      this.actualize()
      : console.log('something went wrong, server status: ' + answer.status);
  }

  requestFolder = async folder => {
    let targetFolder = "./external/";
    folder ? (targetFolder += folder.slice(2)) : console.log(`sending ${targetFolder}`);
    this.setState({ updating: true });

    let response = await this.callBackendAPI(targetFolder, '/external');

    let parsedResponse = response.json();

    parsedResponse
      .then(res => {
        let folders = JSON.parse(res.folders);

        folders = folders.map(item => {
          item.name = this.normalizeItem(item.name);
          return item;
        });

        let files = JSON.parse(res.files);

        files = files.map(item => {
          item.name = this.normalizeItem(item.name);
          return item;
        });

        this.setState({
          folderList: folders,
          fileList: files,
          updating: false,
          selectedItems: {}
        });
      })
      .catch(err => console.log(`error in catch: ${err}`));
  };

  setFileBeingDragged = file => {
    this.setState({ fileBeingDragged: file });
  };

  sortBy = e => {
    let newFolderList = [];
    let newFileList = [];

    switch (e.target.dataset.sort) {
      case "name":
        newFolderList = this.state.folderList.reverse();
        newFileList = this.state.fileList.reverse();

        this.setState({
          fileList: [],
          folderList: []
        })

        this.setState({
          sorting: e.target.dataset.sort,
          folderList: newFolderList,
          fileList: newFileList
        });
        break;

      default:
        return;
    }
  };

  uploadFile = () => {
    this.setState({ uploadMenuVisible: !this.state.uploadMenuVisible });
  };

  componentDidMount() {
    const inputFolder = document.getElementById("App-folderInput");
    this.requestFolder(this.state.currentFolder);

    //create a folder by pressing return, remove event listener when unfocused
    inputFolder.onfocus = () =>
      (document.onkeypress = e => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.createFolder(inputFolder);
        }
      });

    inputFolder.onblur = () => (document.onkeypress = null);
  }

  render() {
    return (
      <section id='App-container'>
        {this.state.inProgress.length > 0 || this.state.finishedItems.length > 0 ?
          <ProgressIndicator
            deleteItem={this.deleteItem}
            handleFileClick={this.handleFileClick}
            inProgress={this.state.inProgress}
            finishedItems={this.state.finishedItems}
            finishZipping={this.finishZipping}
            setState={this.setState}
          />
          : null
        }

        <div id='App-setViewMenu'>
          <span
            className='App-setViewItem'
            onClick={() => this.changeView('list')}
          >
            LIST
        </span>
          <span
            className='App-setViewItem'
            onClick={() => this.changeView('grid')}
          >
            GRID
            </span>
        </div>

        {/* TODO: everything */}
        {this.state.statusOverlayVisible ?
          <StatusOverlay
            message={this.state.statusOverlayMessage}
          />
          : null
        }

        {(() => {
          if (this.state.updating) {
            return (
              <div id='App-folderList'>
                <WaitingScreen
                  waitIcon={waitIcon}
                />
              </div>
            );
          } else if (
            !(
              this.state.folderList.length === 0 &&
              this.state.fileList.length === 0
            )
          ) {

            if (this.state.view === 'list') {
              return (
                <table id='App-folderList' className={this.props.isMobile ? 'folderListMobile' : 'folderListBig'}>
                  <TableHead
                    actualize={this.actualize}
                    callBackendAPI={this.callBackendAPI}
                    clearSelectedItems={this.clearSelectedItems}
                    currentFolder={this.state.currentFolder}
                    fileBeingDragged={this.state.fileBeingDragged}
                    isMobile={this.props.isMobile ? true : false}
                    prevFolder={this.state.prevFolder}
                    selectedItems={this.state.selectedItems}
                    setFileBeingDragged={this.setFileBeingDragged}
                    sortBy={this.sortBy}
                    navigateBack={this.navigateBack}
                    root={this.state.currentFolder === "./" ? true : false}
                  />

                  {this.state.folderList.map((item, index) => {
                    return (
                      <ListItem
                        key={'li-' + index}
                        actualize={this.actualize}
                        callBackendAPI={this.callBackendAPI}
                        clearSelectedItems={this.clearSelectedItems}
                        currentFolder={this.state.currentFolder}
                        downloadFolder={this.downloadFolder}
                        item={item}
                        itemSelect={this.itemSelect}
                        index={index}
                        isMobile={this.props.isMobile ? true : false}
                        deleteItem={this.deleteItem}
                        fileBeingDragged={this.state.fileBeingDragged}
                        handleClick={this.handleFolderClick}
                        renameItem={this.renameItem}
                        selectedItems={this.state.selectedItems}
                        setFileBeingDragged={this.setFileBeingDragged}
                        type='folder'
                      />
                    );
                  })}

                  {this.state.fileList.map((item, index) => {
                    let fileSplit = item.name.split(".");
                    const fileEnding = fileSplit.pop();
                    return (
                      <ListItem
                        key={'li-' + index}
                        actualize={this.actualize}
                        callBackendAPI={this.callBackendAPI}
                        clearSelectedItems={this.clearSelectedItems}
                        currentFolder={this.state.currentFolder}
                        item={item}
                        index={index}
                        deleteItem={this.deleteItem}
                        fileBeingDragged={this.state.fileBeingDragged}
                        fileEnding={fileEnding}
                        handleClick={this.handleFileClick}
                        isMobile={this.props.isMobile ? true : false}
                        itemSelect={this.itemSelect}
                        renameItem={this.renameItem}
                        selectedItems={this.state.selectedItems}
                        setFileBeingDragged={this.setFileBeingDragged}
                        type='file'
                      />
                    );
                  })}
                </table>
              )
            } else {
              return (<GridContainer state={this.state} />);
            }
          } else {
            return (
              <table id='App-folderList'>
                <TableHead
                  actualize={this.actualize}
                  callBackendAPI={this.callBackendAPI}
                  currentFolder={this.state.currentFolder}
                  fileBeingDragged={this.state.fileBeingDragged}
                  prevFolder={this.state.prevFolder}
                  setFileBeingDragged={this.setFileBeingDragged}
                  sortBy={this.sortBy}
                  navigateBack={this.navigateBack}
                  root={this.state.currentFolder === "./" ? true : false}
                />
                <tbody>
                  <tr>
                    <td />
                    <td>this folder is empty...</td>
                    <td>
                      <a
                        href='http://www.assoass.com'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        WATCH PORN INSTEAD!
                </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          }
        })()}

        <ControlFooter
          deleteItem={this.deleteItem}
          isMobile={this.props.isMobile ? true : false}
          selectedItems={this.state.selectedItems}
          updating={this.state.updating}
          uploadFile={this.uploadFile}
        />

        {this.state.uploadMenuVisible ? (
          <FilePond
            fileMetadataObject={{
              'hello': 'world'
            }
            }
            allowMultiple={true}
            allowFileMetadata={true}
            name={"file"}
            server={"./upload"}
            instantUpload={false}
            className='App-filePond'
            oninit={() => { console.log('right event triggered, create an overlay TODO') }}
            onaddfile={(e, file) => {
              //why does this exist? can't retrieve shit in the backend :(
              file.setMetadata('folder', './external/' + this.state.currentFolder.slice(2));
            }}
            onprocessfiles={() => {
              this.setState({ uploadMenuVisible: false });
              this.requestFolder(this.state.currentFolder);
            }
            }
          />
        ) : null}-
      </section>)
  }
}

export default CloudStorage;