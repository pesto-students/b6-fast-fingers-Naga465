import React from "react";
import { formatTime } from "../../utils/utilFunctions";
import Button from "./button";

export const GameOver = ({ gameHistory, onRestartGame, ...rest }) => {
  const latestGameIndex = gameHistory.length - 1;
  const latestGameScore = gameHistory[latestGameIndex];
  return (
    <div style={{ alignItems: "center" }} className="flex_column">
      <h2 className="color-white"> {`SCORE : GAME ${latestGameIndex + 1} `}</h2>
      <h1 className="color-white"> {formatTime(latestGameScore)}</h1>
      {latestGameScore > Math.max(...gameHistory.slice(0, latestGameIndex)) && (
        <h1 style={{ paddingLeft: 15 }} className="color-white">
          {"New High Score"}
        </h1>
      )}
      <Button
        icon="reload-icon.svg"
        name="PLAY AGAIN"
        onClick={onRestartGame}
      />
    </div>
  );
};
