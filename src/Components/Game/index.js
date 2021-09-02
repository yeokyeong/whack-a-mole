import React, { useState, useEffect } from "react";
import "./index.scss";
import Timer from "../Timer";
import Score from "../Score";
import Mole from "../Mole";
import {
  useUpdateEffect,
  getRandomFromInterval,
  getRandomIdx,
  setStorage,
  getStorage
} from "../../Utils/functions";
import {
  INITIAL_MOLES,
  MAX_MOLE_CNT,
  SECOND_TO_SHOW_INTERVAL,
  SECOND_LIMIT,
  SECOND_TO_HIDE
} from "../../Utils/constants";

function Game() {
  const [moles, setMoles] = useState(INITIAL_MOLES);
  const [activeMoles, setActiveMoles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let gameData = getStorage("gameData");
    //FIXME : Logic Repeated
    if (!gameData.hasOwnProperty("moles")) {
      setStorage("gameData", { moles: moles });
    } else {
      setMoles(gameData["moles"]);
    }
    if (!gameData.hasOwnProperty("isPlaying")) {
      setStorage("gameData", { isPlaying: isPlaying });
    } else {
      setIsPlaying(gameData["isPlaying"]);
    }
    if (!gameData.hasOwnProperty("score")) {
      setStorage("gameData", { score: score });
    } else {
      setScore(gameData["score"]);
    }
  }, []);

  useUpdateEffect(() => {
    if (isPlaying) {
      startMoving();
    } else {
      setMoles(INITIAL_MOLES);
      //FIXME : possibility of error
      setScore(0);
      setStorage("gameData", { score: 0 });
    }
    setStorage("gameData", { isPlaying: isPlaying });
  }, [isPlaying]);

  useUpdateEffect(() => {
    setStorage("gameData", { score: score });
  }, [score]);

  useUpdateEffect(() => {
    if (isPlaying) {
      if (activeMoles.length > MAX_MOLE_CNT) {
        hideMole(activeMoles[0], 0);
      }
    }
  }, [activeMoles]);

  /* click event */
  const onClickMole = (idx) => {
    setScore((prev) => prev + 1);
    setMoles((prev) => changeMoleState(prev, idx, false));
  };

  /* start & end */
  const startGame = () => {
    console.log(111, "startGame");
    setIsPlaying(true);
  };
  const endGame = () => {
    console.log(111, "endGame");
    setIsPlaying(false);
  };

  /* mole moving  */
  const startMoving = () => {
    console.log(111, "startMoving");
    let randomSeconds = getRandomFromInterval(
      SECOND_TO_SHOW_INTERVAL.MIN,
      SECOND_TO_SHOW_INTERVAL.MAX
    );
    let timerId = setInterval(() => {
      showMole(randomSeconds);
    }, randomSeconds);
    let gameData = getStorage("gameData");
    setTimeout(() => {
      clearInterval(timerId);
    }, SECOND_LIMIT - gameData["seconds"]);
  };
  const showMole = (seconds) => {
    let randomIdx;
    do {
      randomIdx = getRandomIdx(moles.length);
    } while (activeMoles.indexOf(randomIdx) > -1);

    setMoles((prev) => changeMoleState(prev, randomIdx, true));
    setActiveMoles((prev) => {
      return [...prev, randomIdx];
    });
    hideMole(randomIdx, seconds + SECOND_TO_HIDE);
  };
  const hideMole = (idx, seconds) => {
    setTimeout(() => {
      setMoles((prev) => changeMoleState(prev, idx, false));
      setActiveMoles((prev) => {
        return prev.filter((v) => v !== idx);
      });
      console.log(111, "hideMole");
    }, seconds);
  };

  /* callback */
  const changeMoleState = (prev, idx, state) => {
    let newMoles = [...prev];
    newMoles[idx] = state;
    return newMoles;
  };

  return (
    <div className="component component--game">
      <h2>whack a mole~~!!</h2>
      <div className="game__container">
        <div className="container__header">
          <Timer isPlaying={isPlaying} endGame={endGame} />
          <Score score={score} />
        </div>

        <div className="container__body">
          {moles.map((isActive, idx) => (
            <Mole
              isActive={isActive}
              idx={idx}
              onClickMole={onClickMole}
              key={idx}
            />
          ))}
        </div>

        <div className="container__footer">
          <button
            className={`btn btn--${isPlaying ? "off" : "on"}`}
            onClick={() => {
              if (!isPlaying) startGame();
            }}
          >
            {isPlaying
              ? "you cannot stop this game until the time is up..😈😈"
              : "start"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Game;
