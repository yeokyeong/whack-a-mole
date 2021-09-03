import React from "react";
import "./index.scss";

const History = ({ histories }) => {
  return (
    <div className="history">
      <h4>history</h4>
      <div className="history__container">
        {histories.length ? (
          histories
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((history, idx) => (
              <div className="history__item" key={idx}>
                <span className="item__text--score">
                  Score : {history.score}
                </span>
                <span className="item__text--date"> Date : {history.date}</span>
              </div>
            ))
        ) : (
          <div className="history__empty">empty</div>
        )}
      </div>
    </div>
  );
};

export default History;
