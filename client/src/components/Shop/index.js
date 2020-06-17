import React, { Component } from "react";

import { frets, price } from "../utils/fixed_categories";

import { connect } from "react-redux";
import {
  getProductsToShop,
  getBrands,
  getCategory,
} from "../../redux/actions/product-action";

import CollapseCheckbox from "../utils/collapseCheckbox";
import CollapseRadio from "../utils/collapseRadio";

import LoadmoreCards from "./loadmoreCards";
import PageTop from "../utils/pageTop";

import "./shop.css";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6, //how many elemnt will be render from DB
    skip: 0, //bring next 6 but skip first 6 when loadmore
    filters: {
      brand: [],
      frets: [],
      category: [],
      price: [],
    },
  };

  componentDidMount() {
    this.props.dispatch(getBrands());

    this.props.dispatch(getCategory());

    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        //getting the prices the mathes the id
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    console.log(filters);

    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      //filters=price id
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters,
    });
  };

  showFilteredResults = (filters) => {
    this.props
      .dispatch(getProductsToShop(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0,
        });
      });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getProductsToShop(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        this.setState({
          skip,
        });
      });
  };

 

  render() {
    const products = this.props.products;
    console.log(this.state);
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="">
          <div className="shop_wrapper ">
            <div className="left col-2">
              {products.brands ? (
                <div>
                  <CollapseCheckbox
                    initState={true}
                    title="Brands"
                    list={products.brands}
                    handleFilters={(filters) =>
                      this.handleFilters(filters, "brand")
                    }
                  />
                </div>
              ) : null}

              {products.category ? (
                <div>
                  <CollapseCheckbox
                    initState={false}
                    title="Category"
                    list={products.category}
                    handleFilters={(filters) =>
                      this.handleFilters(filters, "category")
                    }
                  />
                </div>
              ) : null}
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "price")
                }
              />
            </div>
            <div className="right">
              <div className="shop_options">
    
              </div>
              <div style={{ clear: "both" }}>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Shop);
