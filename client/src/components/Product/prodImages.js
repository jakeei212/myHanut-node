import React, { Component } from "react";
import Carousel from "react-images";
import "./styles.css";
import LightBoxImages from "../utils/lightBox";
class ProdImages extends Component {
  state = {
    images: [],
    imagePos: 0,
    currentImage: "",
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.detail.images.length > 0) {
      let lightBoxImages = [];

      this.props.detail.images.forEach((item) => {
        lightBoxImages.push(item.url);
      });

      this.setState({
        images: lightBoxImages,
        currentImage: lightBoxImages[0],
      });
    }
  }

  handleLightBox = (position) => {
    if (this.state.images.length > 0) {
      this.setState({
        imagePos: position,
        currentImage: this.state.images[position],
      });
    }
  };

  showThumbs = () =>
    this.state.images.map((item, i) => (
      <div 
        className="thumb"
        style={{ background: `url(${item}) no-repeat` }}
        key={i}
        onClick={() => this.handleLightBox(i)}
      ></div>
    ));
  render() {
    console.log(this.state);
    const { detail } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.state.currentImage}) no-repeat`,
            }}
            onClick={() => this.handleLightBox(0)}
          ></div>
        </div>
        <div className="main_thumbs">{this.showThumbs()}</div>
      </div>
    );
  }
}

export default ProdImages;
