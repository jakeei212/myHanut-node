import React from "react";
import Card from "../utils/card";

const CardBlockShop = (props) => {
  const renderCards = () =>
    props.list
      ? props.list.map((card) => (
          <div key={card._id} className="col-sm-3">
            <Card {...card} />
          </div>
        ))
      : null;

  return (
    <div className="">
      <div className="d-flex p-2 bd-highlight">
        <div className="d-flex flex-wrap">
          {props.list ? (
            props.list.length === 0 ? (
              <div className="no_result">Sorry, no results</div>
            ) : null
          ) : null}
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;
