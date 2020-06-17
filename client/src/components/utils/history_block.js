import React from "react";
import moment from "moment";

const HistoryBlock = ({ products }) => {
  console.log(products);

  const renderBlock = products.map((product, i) => (
    <tr key={i}>
    <td>{moment(product.dateOfPurchase).format("DD-MM-YYYY")}</td>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.quantity}</td>
    </tr>
  ));



  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price Paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlock}</tbody>
     
      </table>
    </div>
  );
};

export default HistoryBlock;
