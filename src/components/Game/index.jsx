import React, { useRef, useState } from "react";
import PlayerInfo from "./history";
import Score from "./score.jsx";
import Timer from "./timer";
import {
  GAME_OVER,
  GAME_STARTED,
} from "../../utils/constants";
import ScoreCard from "../forms/score";
import { GameOver } from "../forms/gameOver";
import Button from "../forms/button";
import { getData } from "../../utils/utilFunctions";
import useScore  from "./hooks/score";

function Game({ quitGame }) {
  const { score, updateScore, resetScore} = useScore(0);
  const [gameHistory, updateGameHistory] = useState([]);
  const [gameStatus, updateGameStatus] = useState(GAME_STARTED);
  const data = useRef(getData())

  const stopGame = () => {
    if (gameStatus === GAME_STARTED) {
      updateGameStatus(GAME_OVER);
    } else {
      quitGame();
    }
  };

  const playAgain = () => {
    updateGameStatus(GAME_STARTED);
    resetScore()
  };

  const saveGameHistory = (timeLimit) => {
    updateGameStatus(GAME_OVER);
    updateGameHistory([...gameHistory, score + timeLimit]);
  };

  return (
    <div className="flex_column">
      <div className="game-container">
        <PlayerInfo />
        <Score score={score} />
      </div>
      <div
        style={{ alignItems: "center", width: "90%", marginTop: 50 }}
        className="flex_row"
      >
        <ScoreCard gameHistory={gameHistory} />
        <div style={{ flexGrow: 1 }}>
          {gameStatus === GAME_STARTED ? (
            <Timer
              updateScore={updateScore}
              gameOver={saveGameHistory}
              data = {data.current}
            />
          ) : (
            <GameOver
              gameHistory = {gameHistory}
              score={score}
              onRestartGame={playAgain}
            />
          )}
        </div>
        <Button
          icon="cross-icon.svg"
          onClick={stopGame}
          name={gameStatus === GAME_STARTED ? "STOP GAME" : "QUIT GAME"}
        />
      </div>
    </div>
  );
}

export default Game;
