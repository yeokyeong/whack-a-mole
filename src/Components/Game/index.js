import React, { useState, useEffect } from "react";
import "./index.scss";

function Game(props) {
  const initialMoles = Array(24).fill(false);
  const [moles, setMoles] = useState(initialMoles);

  return (
    <div className="component component--game">
      <h2>whack a mole</h2>
      <div className="game__container">
        <div className="container__header">
          <Timer />
          <Score />
        </div>

        <div className="container__body">
          {moles.map((isActive, idx) => (
            <Mole isActive={isActive} idx={idx} />
          ))}
        </div>

        <div className="container__footer"></div>
      </div>
    </div>
  );
}
const Mole = ({ isActive, idx }) => {
  return (
    <div className="mole-home">
      <div className="mole">
        <span>{idx},</span>
        <span>{isActive ? "show" : "hide"}</span>
      </div>
    </div>
  );
};
const Timer = () => {
  return <span className="item item--timer"> Timer : Timer</span>;
};

const Score = () => {
  return <span className="item item--score"> Score : score</span>;
};
export default Game;
