import React, { useState, useEffect } from "react";
import "./index.scss";
import Game from "../../Components/Game";

function Home(props) {
  return (
    <div className="page page--home">
      <Game />
    </div>
  );
}
export default Home;
