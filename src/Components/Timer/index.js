import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  useUpdateEffect,
  setGameStorage,
  getGameStorage
} from "../../Utils/functions";
import { SECOND_LIMIT } from "../../Utils/constants";

const Timer = ({ isPlaying, endGame }) => {
  const [seconds, setSeconds] = useState(0);
  const interval = 1000;

  useEffect(() => {
    let gameData = getGameStorage();
    if (!gameData.hasOwnProperty("seconds")) {
      setGameStorage({ seconds });
    } else {
      setSeconds(gameData["seconds"]);
    }
  }, []);

  useUpdateEffect(() => {
    if (isPlaying) {
      setTimer();
    } else {
      setSeconds(0);
      setGameStorage({ seconds: 0 });
    }
  }, [isPlaying]);

  useEffect(() => {
    if (seconds > 0) {
      setGameStorage({ seconds });
    }
  }, [seconds]);

  const setTimer = () => {
    let timerId = setInterval(() => {
      setSeconds((prev) => prev + 1000);
    }, interval);
    setTimeout(() => {
      clearInterval(timerId);
      endGame();
    }, SECOND_LIMIT - seconds);
  };

  return (
    <span className="item item--timer">
      Timer :
      <span className="item__strong"> {(SECOND_LIMIT - seconds) / 1000}</span>
      seconds
    </span>
  );
};
export default Timer;
