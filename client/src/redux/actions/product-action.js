import axios from "axios";
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
  
} from "./types";

import { PRODUCT_SERVER } from "../../components/utils/misc";

//Get Product Details
export function getProductDetail(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then((response) => {
      return response.data[0];
    });
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request,
  };
}

export function clearProductDetail() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: "",
  };
}

//Get Most Soldable
export function getProductsBySell() {
  //?sortBy=sold&order=desc&limit=100
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request,
  };
}

//Get Most Newset
export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request,
  };
}

//BRAND
export function getBrands() {
  const request = axios
    .get(`${PRODUCT_SERVER}/brands`)
    .then((response) => response.data);

  return {
    type: GET_BRANDS,
    payload: request,
  };
}

//CATEGORY
export function getCategory() {
  const request = axios
    .get(`${PRODUCT_SERVER}/category`)
    .then((response) => response.data);

  return {
    type: GET_CATEGORY,
    payload: request,
  };
}

//GET-ALL
export function getProductsToShop(
  skip, //when load more skips the first we got
  limit, //amount of items we bring from DB
  filters = [], //all the filters
  previousState = [] //
) {
  //new obj
  const data = {
    limit,
    skip,
    filters,
  };

  const request = axios
    .post(`${PRODUCT_SERVER}/shop`, data)
    .then((response) => {
      let newState = [...previousState, ...response.data.articles];
      return {
        size: response.data.size,
        articles: newState,
      };
    });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request,
  };
}

//ADD PRODUCT
export function addProduct(datatoSubmit) {
  //new obj
  console.log(datatoSubmit);
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}

//For clearing the product_add data from redux
export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: "",
  };
}

//ADD BRAND
export function addBrand(dataToSubmit, existingBrands) {
  //merge the brands from dataTo sumbit with existing
  const request = axios
    .post(`${PRODUCT_SERVER}/brands`, dataToSubmit)
    .then((response) => {
      //copy of existing brands
      let brands = [...existingBrands, response.data.brand];
      return {
        success: response.data.success,
        brands,
      };
    });
  return {
    type: ADD_BRANDS,
    payload: request,
  };
}

//ADD CATEGORY
export function addCategory(dataToSubmit, existingCategory) {
  //merge the category from dataTo sumbit with existing
  const request = axios
    .post(`${PRODUCT_SERVER}/category`, dataToSubmit)
    .then((response) => {
      //copy of existing category
      let category = [...existingCategory, response.data.category];
      return {
        success: response.data.success,
        category,
      };
    });
  return {
    type: ADD_CATEGORY,
    payload: request,
  };
}
