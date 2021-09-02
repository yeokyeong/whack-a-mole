import React, { useState, useEffect, useRef } from "react";
import "./index.scss";

const useUpdateEffect = (effect, dependencies = []) => {
  //FIXME
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
};

const maxSeconds = 30000;
const showSeconds = {
  min: 1000,
  max: 3000
};
const hideSeconds = 500;
const maxMoleCnt = 5;
const MoleCnt = 24;
const initialMoles = Array(MoleCnt).fill(false);
const breakLines = getBreakLines(MoleCnt);

function getBreakLines(MoleCnt) {
  let k = 2;
  let i = 1;
  let pivot = MoleCnt / 2;
  let beforeVal = 0;
  let result = [];

  while (beforeVal < pivot) {
    beforeVal += k * i;
    result.push(beforeVal);
    i++;
  }
  while (beforeVal >= pivot) {
    i--;
    beforeVal += k * i;
    if (beforeVal >= 24) {
      break;
    }
    result.push(beforeVal);
  }
  return result;
}
function Game() {
  const [moles, setMoles] = useState(initialMoles);
  const [activeMoles, setActiveMoles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let gameData = getStorage();
    //FIXME : Logic Repeated
    if (!gameData.hasOwnProperty("moles")) {
      setStorage("moles", moles);
    } else {
      setMoles(gameData["moles"]);
    }
    if (!gameData.hasOwnProperty("isPlaying")) {
      setStorage("isPlaying", isPlaying);
    } else {
      setIsPlaying(gameData["isPlaying"]);
    }
    if (!gameData.hasOwnProperty("score")) {
      setStorage("score", score);
    } else {
      setScore(gameData["score"]);
    }
  }, []);

  useUpdateEffect(() => {
    if (isPlaying) {
      startMoving();
    } else {
      setMoles(initialMoles);
      //FIXME : possibility of error
      setScore(0);
      setStorage("score", 0);
    }
    setStorage("isPlaying", isPlaying);
  }, [isPlaying]);

  useUpdateEffect(() => {
    setStorage("score", score);
  }, [score]);

  useUpdateEffect(() => {
    if (isPlaying) {
      if (activeMoles.length > maxMoleCnt) {
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
    let randomSeconds = getRandomFromInterval(showSeconds.min, showSeconds.max);
    let timerId = setInterval(() => {
      showMole(randomSeconds);
    }, randomSeconds);

    let gameData = getStorage();
    setTimeout(() => {
      clearInterval(timerId);
    }, maxSeconds - gameData["seconds"]);
  };
  const showMole = (seconds) => {
    let randomIdx;
    do {
      randomIdx = getRandomIdx();
    } while (activeMoles.indexOf(randomIdx) > -1);

    setMoles((prev) => changeMoleState(prev, randomIdx, true));
    setActiveMoles((prev) => {
      return [...prev, randomIdx];
    });
    hideMole(randomIdx, seconds + hideSeconds);
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

  /* utils */
  const getRandomFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const getRandomIdx = () => {
    return Math.floor(Math.random() * moles.length);
  };

  const setStorage = (key, value) => {
    let gameData = getStorage();
    gameData[key] = value;
    localStorage.setItem("gameData", JSON.stringify(gameData));
  };
  const getStorage = () => {
    let gameData = {};
    try {
      gameData = localStorage.getItem("gameData")
        ? JSON.parse(localStorage.getItem("gameData"))
        : {};
    } catch (error) {
      gameData = {};
    }
    return gameData;
  };

  return (
    <div className="component component--game">
      <h2>whack a mole</h2>
      <div className="game__container">
        <div className="container__header">
          <Timer
            maxSeconds={maxSeconds}
            isPlaying={isPlaying}
            setStorage={setStorage}
            getStorage={getStorage}
            endGame={endGame}
          />
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
          <button onClick={startGame}>시작</button>
        </div>
      </div>
    </div>
  );
}
const Mole = ({ isActive, idx, onClickMole }) => {
  return (
    <>
      {breakLines.indexOf(idx) > -1 && <hr />}
      <div
        className="mole-home"
        onClick={() => {
          if (isActive) onClickMole(idx);
        }}
      >
        <div className={`mole mole__${isActive ? "on" : "off"}`}>
          <span>{idx},</span>
          <span>{isActive ? "show" : "hide"}</span>
        </div>
      </div>
    </>
  );
};

const Timer = ({ maxSeconds, isPlaying, setStorage, getStorage, endGame }) => {
  const [seconds, setSeconds] = useState(0);
  const interval = 1000;

  useEffect(() => {
    let gameData = getStorage();
    if (!gameData.hasOwnProperty("seconds")) {
      setStorage("seconds", seconds);
    } else {
      setSeconds(gameData["seconds"]);
    }
  }, []);

  useUpdateEffect(() => {
    if (isPlaying) {
      setTimer();
    } else {
      setSeconds(0);
      setStorage("seconds", 0);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (seconds > 0) {
      setStorage("seconds", seconds);
    }
  }, [seconds]);

  const setTimer = () => {
    let timerId = setInterval(() => {
      setSeconds((prev) => prev + 1000);
    }, interval);
    setTimeout(() => {
      clearInterval(timerId);
      endGame();
    }, maxSeconds - seconds);
  };

  return (
    <span className="item item--timer">
      Timer : {(maxSeconds - seconds) / 1000} seconds
    </span>
  );
};

const Score = ({ score }) => {
  return <span className="item item--score"> Score : {score}</span>;
};

export default Game;
