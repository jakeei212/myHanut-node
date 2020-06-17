import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_CATEGORY,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRANDS,
  ADD_CATEGORY,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL, //for clean redux
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_CATEGORY:
      return { ...state, category: action.payload };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case ADD_BRANDS:
      return {
        ...state,
        addBrand: action.payload,
        //updating the brands directly with what ever
        //comes from action.payload
        brands: action.payload.brands,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        addCategory: action.payload,
        //updating the category directly with what ever
        //comes from action.payload
        category: action.payload.category,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload,
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload,
      };
    default:
      return state;
  }
}
