import React from "react";
import { formatTime } from "../../utils/utilFunctions";

function Score({ value = 0 }) {
  return (
    <div className="flex_column">
      <label className="color-default text-style padding_top_15">
        {"fast fingers"}
      </label>
      <label className="color-default text-style padding_top_15">{`Score : ${formatTime(
        value
      )}`}</label>
    </div>
  );
}

export default Score;
