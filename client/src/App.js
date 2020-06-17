import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./hoc/Layout";
import Register_Login from "./components/register_login/index";
import Register from "./components/register_login/Register";
import UserDashboard from "./components/user/index";
import Auth from "./hoc/auth/Auth";
import Shop from "./components/Shop";
import AddProduct from "./Admin/add-products";
import AllCategories from "./Admin/all-categories";
import ProductPage from "./components/Product/index";
import Cart from "./components/user/cart";
import UpdateProfile from "./components/user/update-profile";
const App = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(AllCategories, true)}
        />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductPage, null)}
        />
        <Route
          path="/user/user_profile"
          exact
          component={Auth(UpdateProfile, true)}
        />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/login" exact component={Auth(Register_Login, false)} />
        <Route path="/user/cart" exact component={Auth(Cart, true)} />
      </Switch>
    </Layout>
  );
};

export default App;
