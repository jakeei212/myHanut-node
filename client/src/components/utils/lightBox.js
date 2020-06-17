import React, { Component } from "react";
import Carousel from "react-images";

class LightBoxImages extends Component {
  state = {
    photoIndex: 0,
    isOpen: true,
    currentImage: this.props.position,
    images: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach((element) => {
        images.push({ src: `${element}` });
      });
      //returning new state of images
      return (state = {
        images,
      });
    }
    return false;
  }
  render() {
    return <div><Carousel views={this.state.images} /></div>;
  }
}

export default LightBoxImages;
