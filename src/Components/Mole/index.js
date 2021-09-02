import React from "react";
import "./index.scss";
import { moleCnt } from "../../Utils/constants";

const breakLines = getBreakLines(moleCnt);
function getBreakLines(moleCnt) {
  let k = 2;
  let i = 1;
  let pivot = moleCnt / 2;
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

const Mole = ({ isActive, idx, onClickMole }) => {
  return (
    <>
      {breakLines.indexOf(idx) > -1 && <hr />}
      <div className="mole-home">
        <div
          className={`mole mole__${isActive ? "on" : "off"}`}
          onClick={() => {
            if (isActive) onClickMole(idx);
          }}
        ></div>
      </div>
    </>
  );
};

export default Mole;
