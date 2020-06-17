import React, { Component } from "react";
import UserLayout from "../../hoc/user/user-layout";
import { connect } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../redux/actions/user-action";
import Productblock from "../utils/product-block";
import PayPal from "../utils/paypal";

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showSuccess: false,
    showTotal: false,
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    console.log(user);
    if (user.authBlyat.cart) {
      if (user.authBlyat.cart.length > 0) {
        user.authBlyat.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        this.props
          .dispatch(getCartItems(cartItems, user.authBlyat.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;
    console.log(this.props);
    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    this.setState({
      total,
      showTotal: true,
    });
  };

  showNoItemMessage = () => (
    <div className="cart_no_item">You have no items yet</div>
  );
  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false,
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  transactionError = (data) => {
    console.log(data);
  };

  transactionCanceled = () => {};

  transactionSuccess = (data) => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data,
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true,
          });
        }
      });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1 style={{ fontFamily: "'MuseoModerno', cursive"}}>My cart</h1>
          <div className="user_cart"></div>
          <Productblock
            products={this.props.user}
            type="cart"
            removeItem={(id) => this.removeFromCart(id)}
          />
          {this.state.showTotal ? (
            <div className="user_cart_sum" >
              <div>Total: {this.state.total}</div>
            </div>
          ) : this.state.showSuccess ? (
            <div className="cart_success">
              Thanks you for ordering,the order is on the way.
            </div>
          ) : (
            this.showNoItemMessage()
          )}
        </div>
        {this.state.showTotal ? (
          <div className="paypal_button">
            <PayPal
              toPay={this.state.total}
              transactionError={(data) => this.transactionError(data)}
              transactionCanceled={(data) => this.transactionCanceled(data)}
              onSuccess={(data) => this.transactionSuccess(data)}
            />
          </div>
        ) : null}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
