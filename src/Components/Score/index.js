import React from "react";

const Score = ({ score }) => {
  return (
    <span className="item item--score">
      Score : <span className="item__strong">{score}</span>
    </span>
  );
};
export default Score;
