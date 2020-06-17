import React, { Component } from "react";
import PageTop from "../utils/pageTop";
import "./styles.css";
import ProdImages from "./prodImages";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
} from "../../redux/actions/product-action";
import { addToCart } from "../../redux/actions/user-action";
import ProdInfo from "./prodInfo";
class ProductPage extends Component {
  componentDidMount() {
    //get the id from url
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCart = (id) => {
    this.props.dispatch(addToCart(id));
    console.log(id);
  };

  render() {
    return (
      <div>
        <PageTop title="Product detail" />
        <div className="container ">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper row">
              <div className="d-flex flex-wrap">
                <div className="left col-sm-6">
                  <div style={{ width: "400px" }}>
                    <ProdImages detail={this.props.products.prodDetail} />
                  </div>
                </div>
              </div>

              <div className="right col-sm-6">
                <ProdInfo
                  addToCart={(id) => this.addToCart(id)}
                  detail={this.props.products.prodDetail}
                />{" "}
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user.authBlyat,
  };
};

export default connect(mapStateToProps)(ProductPage);
