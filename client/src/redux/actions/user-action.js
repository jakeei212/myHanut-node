import axios from "axios";

import { USER_SERVER, PRODUCT_SERVER } from "../../components/utils/misc";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY_USER,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA
} from "./types";

//LOGIN
export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);
  //redux
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

//REGISTER
export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);
  //redux
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

//AUTH
export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);
  //redux
  return {
    type: AUTH_USER,
    payload: request,
  };
}

//LOGOUT
export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);
  //redux
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

//ADD to cart
export function addToCart(_id) {
  const request = axios
    .post(`${USER_SERVER}/addtocart?productId=${_id}`)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request,
  };
}

//GET Cart Items
export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      console.log(response);
      userCart.forEach((item) => {
        response.data.forEach((k, i) => {
          if (item.id === k._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: GET_CART_ITEMS_USER,
    payload: request,
  };
}

///Remove cart item
export function removeCartItem(id) {
  const request = axios
    .get(`${USER_SERVER}/removefromcart?_id=${id}`)
    .then((response) => {
      response.data.cart.forEach((item) => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}

///Remove cart item
export function onSuccessBuy(data) {
  const request = axios
    .post(`${USER_SERVER}/successbuy`, data)
    .then((response) => response.data);
  return {
    type: ON_SUCCESS_BUY_USER,
    payload: request,
  };
}

///Remove cart item
export function updateUserData(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then((response) => response.data);
  return {
    type: UPDATE_USER_DATA,
    payload: request,
  };
}

//cleannig redux in what we set on the updateUserData
export function clearUpdateUser() {

  return {
    type: CLEAR_UPDATE_USER_DATA,
    payload: '',
  };
}


