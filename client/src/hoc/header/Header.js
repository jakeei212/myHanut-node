import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import './Header.css'
import SideDrawer from "./SideDrawer";

class Header extends Component {
  state = {
    drawerOpen: false,
    headerShow: false,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 0) {
      this.setState({
        headerShow: true,
      });
    } else {
      this.setState({
        headerShow: false,
      });
    }
  };

  toggle = (value) => {
    this.setState({
      drawerOpen: value,
    });
  };

  render() {
    return (
      <header
        position="fixed"
        style={{
          backgroundColor: this.state.headerShow ? "#f34444" : "transparent",
          boxShadow: "none",
          padding: "10px 0px",
          width: "100%",
        }}
      >
        <Toolbar>
          <div className="header_logo">
            <div
            style={{
              color: this.state.headerShow ? "white" : "black",
              boxShadow: "none",
              padding: "10px 0px",
              width: "100%",
            }} className="font_righteous logo">Shop</div>
           
          </div>

          <img
            src="/images/pngwing.com.png"
            onClick={() => this.toggle(true)}
            style={{
              width:"50px",
              height:"50px",
              float:"left",
              cursor:"pointer"
            }}
            />
           
         

          <SideDrawer
            open={this.state.drawerOpen}
            onClose={(value) => this.toggle(value)}
          />
        </Toolbar>
      </header>
    );
  }
}

export default Header;
