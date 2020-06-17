import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY_USER,
  CLEAR_UPDATE_USER_DATA,
  UPDATE_USER_DATA,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, authBlyat: action.payload };
    //in this case we destroy the token from the server so no need to verify
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          //instead updating all the userdata
          //just grabbing the last state of userdata
          //and merging it with cart
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS_USER:
      return {
        ...state,
        cartDetail: action.payload,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        authBlyat: {
          ...state.authBlyat,
          cart: action.payload.cart,
        },
      };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        authBlyat: {
          ...state.authBlyat, //passing it on server
          cart: action.payload.cart,
        },
        cartDetail: action.payload.cartDetail,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        updateUser: action.payload,
      };
    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state,
        updateUser: action.payload,
      };
    default:
      return state;
  }
}
