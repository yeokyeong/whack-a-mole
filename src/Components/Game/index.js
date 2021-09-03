import React, { useState, useEffect } from "react";
import "./index.scss";
import Timer from "../Timer";
import Score from "../Score";
import Mole from "../Mole";
import History from "../History";
import {
  useUpdateEffect,
  getRandomFromInterval,
  getRandomIdx,
  setGameStorage,
  getGameStorage,
  setHistoryStorage,
  getHistoryStorage
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
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    let gameData = getGameStorage();
    //FIXME : Logic Repeated
    if (!gameData.hasOwnProperty("isPlaying")) {
      setGameStorage({ isPlaying: isPlaying });
    } else {
      setIsPlaying(gameData["isPlaying"]);
    }
    if (!gameData.hasOwnProperty("score")) {
      setGameStorage({ score: score });
    } else {
      setScore(gameData["score"]);
    }

    let scoreHistories = getHistoryStorage();
    if (scoreHistories) {
      setHistories(scoreHistories);
    }
  }, []);

  useUpdateEffect(() => {
    if (isPlaying) {
      startMoving();
    } else {
      let history = { score, date: new Date().toLocaleString() };
      //FIXME : how about fix to detect localstorage event?
      setHistories((prev) => [...prev, history]);
      setHistoryStorage(history);

      //FIXME : possibility of error
      setScore(0);
      setGameStorage({ score: 0 });

      setMoles(INITIAL_MOLES);
    }
    setGameStorage({ isPlaying: isPlaying });
  }, [isPlaying]);

  useUpdateEffect(() => {
    setGameStorage({ score: score });
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
    setIsPlaying(true);
  };
  const endGame = () => {
    setIsPlaying(false);
  };

  /* mole moving  */
  const startMoving = () => {
    let randomSeconds = getRandomFromInterval(
      SECOND_TO_SHOW_INTERVAL.MIN,
      SECOND_TO_SHOW_INTERVAL.MAX
    );
    let timerId = setInterval(() => {
      showMole(randomSeconds);
    }, randomSeconds);
    let gameData = getGameStorage();
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
      <h2>whack a mole</h2>
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
          <History histories={histories} />
        </div>
      </div>
    </div>
  );
}
export default Game;
