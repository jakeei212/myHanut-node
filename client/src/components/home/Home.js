import React, { Component } from "react";
import "./home.css";
import HomeSlider from "./home-slider";
import HomePromotion from "./home-promotion";
import CardBlock from "../utils/card-block";

import { connect } from "react-redux";
import {
  getProductsBySell,
  getProductsByArrival,
} from "../../redux/actions/product-action";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock list={this.props.products} title="New arrivals" />
        <HomePromotion />
        <CardBlock
          className=""
          list={this.props.products}
          title="Best Selling"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Home);
