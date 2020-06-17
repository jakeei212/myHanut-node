import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../redux/actions/user-action";
import CircularProgress from "@material-ui/core/CircularProgress";

///props comes from the router
///return composed class like function that returns a function
//ComposedClass=componet we render,reload=true or false,adminRoute=by default null
export default function (ComposedClass, reload, adminRoute = null) {
  class Auth extends Component {
    state = {
      loading: true,
    };

    //The state was inject with mapStateToProps
    //so we can use this.props.now  componentDidMount()
    componentDidMount() {
      this.props.dispatch(auth()).then((response) => {
        //check the cookies for user check the auth
        let user = this.props.user.authBlyat;

        if (!user.isAuth) {
          //if logged in
          if (reload) {
            this.props.history.push("/login");
          }
        } else {
          //if user trying to enter admin route
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              this.props.history.push("/user/dashboard");
            }
          }
        }
        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return (
        <div>
          <ComposedClass {...this.props} user={this.props.user} />
        </div>
      );
    }
  }

  //Storing user in redux state
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

  return connect(mapStateToProps)(Auth);
}
