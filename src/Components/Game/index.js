import React, { useState, useEffect } from "react";
import "./index.scss";

function Game(props) {
  const initialMoles = Array(24).fill(false);
  const maxSeconds = 10000;
  const minInterval = 1000;
  const maxInterval = 3000;

  const [moles, setMoles] = useState(initialMoles);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      startMoving();
    } else {
      setMoles(initialMoles);
    }
  }, [isPlaying]);

  /* start & end */
  const startGame = () => {
    setIsPlaying(true);
  };
  const endGame = () => {
    setIsPlaying(false);
  };

  /* mole moving  */
  const startMoving = () => {
    console.log(111, "startMoving");

    let randomSeconds = getRandomFromInterval(minInterval, maxInterval);
    showMole(randomSeconds);
  };

  const showMole = (seconds) => {
    console.log(111, "showMole");

    let randomIdx = getRandomIdx();
    hideMole(randomIdx, seconds);
  };
  const hideMole = (idx, seconds) => {
    console.log(111, "hideMole");
  };

  /* utils */
  const getRandomFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const getRandomIdx = () => {
    return Math.floor(Math.random() * moles.length);
  };
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

        <div className="container__footer">
          <button onClick={startGame}>시작</button>
        </div>
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
  const [seconds, setSeconds] = useState(0);
  return <span className="item item--timer"> Timer : {seconds}</span>;
};

const Score = () => {
  const [score, setScore] = useState(0);
  return <span className="item item--score"> Score : {score}</span>;
};
export default Game;
