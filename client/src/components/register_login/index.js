import React from "react";
import MyButton from "../utils/button";
import "./register_login.css";
import Login from "./Login";

const Register_Login = () => {
  return (
    <div className="">
      <div className="container">
        <div className="register_login_container d-flex flex-wrap">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="col-sm-1"></div>
          <div className="right ">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register_Login;
