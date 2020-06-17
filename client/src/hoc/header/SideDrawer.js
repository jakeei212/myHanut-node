import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/user-action";
import { connect } from "react-redux";

class SideDrawer extends Component {
  state = {
    user: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false,
      },
      {
        name: "Home",
        linkTo: "/",
        public: true,
      },
      {
        name: "Products",
        linkTo: "/shop",
        public: true,
      },
      {
        name: "Profile",
        linkTo: "/user/dashboard",
        public: false,
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true,
      },
      {
        name: "Logout",
        linkTo: "/user/logout",
        public: false,
      },
    ],
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        //dont forget withRouter import
        this.props.history.push("/");
      }
    });
  };

  defaultLink = (item, i) =>
    item.name === "Logout" ? (
      <div
        style={{
          color: "red",
          fontSize: "1.5rem",
          cursor: "pointer",
          fontFamily: "'MuseoModerno', cursive",
          textAlign: "center",
        }}
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
        <hr></hr>
        <br></br>
      </div>
    ) : (
      <div key={i}>
        <Link
          onClick={() => this.props.onClose(false)}
          style={{
            color: "black",
            fontSize: "1.5rem",
            padding: "40px",
            textAlign: "center",
            fontFamily: "'MuseoModerno', cursive",
          }}
          to={item.linkTo}
        >
          {item.name}
        </Link>
        <hr></hr>
      </div>
    );

  cartLink = (item, i) => {
    //ref to user
    const user = this.props.user.authBlyat;
    //return the cart items
    return (
      <div
        className="row"
        style={{
          color: "black",
          fontSize: "1.5rem",
          padding: "40px",
          textAlign: "center",
        }}
        key={i}
      >
        <div>{user.cart ? user.cart.length : 0}</div>
        <Link to={item.linkTo}>
          <img src="/images/cart.png" />
        </Link>
        <br></br>
        <br></br>
      </div>
    );
  };

  //Showlink upon auth
  showLinks = (type) => {
    let list = [];
    //if user logged in
    if (this.props.user.authBlyat) {
      //loop the links
      type.forEach((item) => {
        //if user not logged in
        if (!this.props.user.authBlyat.isAuth) {
          //if link are public
          if (item.public === true) {
            list.push(item);
          }
        } else {
          //if user logged in
          if (item.name !== "Log in") {
            list.push(item);
          }
        }
      });
    }

    //return the links
    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    return (
      <div>
        <Drawer
          anchor="left"
          open={this.props.open}
          onClose={() => this.props.onClose(false)}
        >
          <List component="nav">
            <div className="col"> {this.showLinks(this.state.user)}</div>
          </List>
        </Drawer>
      </div>
    );
  }
}

//Bringing props from redux
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withRouter(SideDrawer));
