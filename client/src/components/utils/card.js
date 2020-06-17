import React, { Component } from "react";
import MyButton from "./button";

import { connect } from "react-redux";

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/featured_home4.jpg";
    }
  }

  render() {
    const props = this.props;

    return (
      <div
        className="col-sm"
        style={{
          margin: "10px",
        }}
      >
        <div className="image">
          <img
            style={{
              width: "100%",
              padding: "0px",
              height: "250px",
              border: "1px solid #999592",
        
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
           
            }}
            src={this.renderCardImage(props.images)}
          />
        </div>
        <div
          className="action_container"
          style={{
            textAlign: "center",
          }}
        >
          <div className="tags">
            <div
              style={{
                fontFamily: "'Monoton', cursive",
                borderBottom: "2px solid black",
                fontSize:"2rem"
              }}
            >
              {props.brand.name}
            </div>
            <div
              style={{
                fontWeight: "900",
                fontSize:"1.3rem",
                fontFamily: "'Monoton', cursive",
              }}
            >
              {props.name}
            </div>
            <div
              style={{
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
                boxSizing: "border-box",
                
                  fontWeight: "900",
                  fontFamily: "'MuseoModerno', cursive"
              }}
            >
              ${props.price}
            </div>
          </div>

      

          <div className="actions">
            <div className="button_wrapp">
              <MyButton
         
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyles={{
                  margin: "10px 0 0 0",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Card);
