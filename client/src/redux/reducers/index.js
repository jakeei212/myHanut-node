import { combineReducers } from "redux";
import user from "./user-reducer";
import products from "./product-reducer";

const rootReducer = combineReducers({
  user,
  products,
});

export default rootReducer;
