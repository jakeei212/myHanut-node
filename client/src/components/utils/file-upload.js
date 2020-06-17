import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import '../../Admin/styles.css'
class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      uploading: false,
    };
  }

  handleFileDrops = (files) => {
    this.setState({ uploading: true });
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    let formData = new FormData();

    formData.append("file", files[0]);

    axios
      .post("/api/product/uploadimage", formData, config)
      .then((response) => {
        console.log(response.data);
        this.setState(
          {
            uploading: false,
            uploadedFiles: [...this.state.uploadedFiles, response.data],
          },
          () => {
            //send props to the parent add-product
            this.props.imagesHandler(this.state.uploadedFiles);
          }
        );
      });
  };

  //Remove image
  onRemove = (id) => {
    axios.get(`/api/product/removeimage?public_id=${id}`).then((response) => {
      let images = this.state.uploadedFiles.filter((item) => {
        //filter returs as array
        //return all the entries as array
        //ecxpet the id we deleted
        return item.public_id !== id;
      });
      this.setState(
        {
          uploadedFiles: images,
          //sending props to back to parent
        }, //the new state of images
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };
  //Returns what we have in the uploaded files
  showUploadedImages = () =>
    this.state.uploadedFiles.map((item) => (
      <div key={item.public_id} onClick={() => this.onRemove(item.public_id)}>
        <img style={{ width: "150px", height: "150px" }} src={item.url} />
      </div>
    ));

  //Clean the images after form gets submited
  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: [],
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        <Dropzone  className="wrap" onDrop={this.handleFileDrops} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone_box dropzone wrap"{...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
        <div className="row"> {this.showUploadedImages()}</div>

        {this.state.uploading ? (
          <div
            className="dropzone_box"
            style={{
              textAlign: "center",
              paddingTop: "60px",
            }}
          >
            <CircularProgress
              style={{
                color: "#00bcd4",
              }}
              thickkness={7}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUpload;
