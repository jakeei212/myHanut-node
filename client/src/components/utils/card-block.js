import React from "react";
import Card from "./card";

const CardBlock = (props) => {
  let items;
  let { byArrival } = props.list;

  if (byArrival) {
    items = byArrival
      ? byArrival.map((card, i) => <Card key={i} {...card} />)
      : null;
  }

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? (
          <div
            style={{
              fontFamily: "'MuseoModerno', cursive",
              textAlign: "center",
              fontSize:"3rem",
              fontWeight:"800"
            }}
            className="title"
          >
            {props.title}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {items}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
