import React, { Component } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
