import React, { Component } from "react";
import FormField from "../utils/form-field";
import { update, generateData, isFormValid } from "../utils/from-actions";
import { withRouter } from "react-router-dom";
import "./register_login.css";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/user-action";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "login");

    let formIsValid = isFormValid(this.state.formdata, "login");

    if (formIsValid) {
      //dispathing and cathing the response
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        //if user logs
        if (response.payload.loginSuccess) {
          this.props.history.push("/user/dashboard");
        } else {
          this.setState({
            formError: true,
          });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />

          <FormField
            id={"password"}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <button
            style={{
              background: "#f34444",
              color: "white",
              width:"100%",
              border:"none"
            }}
            onClick={(event) => this.submitForm(event)}
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
