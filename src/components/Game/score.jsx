import React from "react";
import { formatTime } from "../../utils/utilFunctions";

function Score({ value = 0 }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1> fast Fingers</h1>
      <h2>{`Score : ${formatTime(value)}`}</h2>
    </div>
  );
}

export default Score;
