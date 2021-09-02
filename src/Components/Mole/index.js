import React from "react";
import "./index.scss";
import { TOTAL_MOLE_CNT } from "../../Utils/constants";

const breakLines = getBreakLines(TOTAL_MOLE_CNT);
function getBreakLines(TOTAL_MOLE_CNT) {
  let k = 2;
  let i = 1;
  let pivot = TOTAL_MOLE_CNT / 2;
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
