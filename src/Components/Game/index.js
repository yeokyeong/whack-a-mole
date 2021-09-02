import React, { useState, useEffect } from "react";
import "./index.scss";

function Game(props) {
  return (
    <div className="component component--game">
      <h2>whack a mole</h2>
      <div className="game__container">
        <div className="container__header"></div>

        <div className="container__body"></div>

        <div className="container__footer"></div>
      </div>
    </div>
  );
}
export default Game;
