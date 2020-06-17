import React from "react";
import MyButton from "../utils/button";
import "./styles.css";

const ProdInfo = (props) => {
  const showprodTags = (detail) => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>ICON</div>
          <div className="tag_text">
            <div>Free Shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <img src="/images/icon.png" />
          <div className="tag_text">
            <div>Available</div>
            <div>in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <img src="/images/icon.png" />
          <div className="tag_text">
            <div>Not Available</div>
            <div>Preorder</div>
          </div>
        </div>
      )}
    </div>
  );
  const showProductActions = () => (
    <div className="product_actions">
      <div className="price">${detail.price}</div>
      <div className="cart">
        <MyButton
       
          type="add_to_cart_link"
          runAction={() => props.addToCart(detail._id)}
        />
      </div>
    </div>
  );

  const detail = props.detail;

  return (
    <div>
      <h1
        style={{
          fontFamily: "'MuseoModerno', cursive",
        }}
      >
        {detail.brand.name},{detail.name}
      </h1>
      <p> {detail.description}</p>
      {showprodTags(detail)}
      {showProductActions(detail)}
    </div>
  );
};

export default ProdInfo;
