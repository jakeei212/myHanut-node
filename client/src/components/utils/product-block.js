import React from "react";

const Productblock = ({ products, removeItem }) => {
  console.log(products);
  const renderItems = () =>
    products.cartDetail
      ? products.cartDetail.map((products) => (
          <div className="user_product_block" key={products._id}>
            <div className="item">
              <div className="image">
                <img
                  style={{
                    width: "70px",
                    height: "70px",

                    border: "1px solid #999592",

                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    opacity: "0.96",
                    webkitBoxShadow: "-2px 2px 5px 3px rgba(0,0,0,0.75)",
                    mozBoxShadow: "-2px 2px 5px 3px rgba(0,0,0,0.75)",
                    boxShadow: " -2px 2px 5px 3px rgba(0,0,0,0.75)",
                  }}
                  src={products.images[0]?.url}
                />
              </div>
            </div>
            <div
              className="item"
              style={{ fontFamily: "'MuseoModerno', cursive" }}
            >
              <h4>Product Name</h4>
              <div>
                {products.brand.name},{products.name}
              </div>
            </div>
            <div
              className="item"
              style={{ fontFamily: "'MuseoModerno', cursive" }}
            >
              <h4>Quantity</h4>
              <div>{products.quantity}</div>
            </div>
            <div
              className="item"
              style={{ fontFamily: "'MuseoModerno', cursive" }}
            >
              <h4>Price</h4>
              <div>{products.price}</div>
            </div>
            <div className="item-btn">
              <div
                onClick={() => removeItem(products._id)}
                className="cart_remove_btn"
                style={{ fontFamily: "'MuseoModerno', cursive" }}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;
  return <div>{renderItems()}</div>;
};

export default Productblock;
