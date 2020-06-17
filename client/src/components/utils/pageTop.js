import React from "react";
import { connect } from "react-redux";

const PageTop = (props) => {
  return (
    <div className="page_top">
      <div className="container">{props.children}</div>
    </div>
  );
};

export default PageTop;
