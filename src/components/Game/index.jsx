import React, { useEffect, useState } from "react";
import PlayerInfo from "./history";
import Score from "./score.jsx";
import Timer from "./timer";
import { GAME_OVER, GAME_STARTED } from "../../utils/constants";
import ScoreCard from "../forms/score";
import { GameOver } from "../forms/gameOver";
import Button from "../forms/button";
import useScore from "./hooks/score";
import fetcher from "../../api";
import { initState} from '../../authenticateService'

function Game({ quitGame, ...props }) {
  const { score, updateScore, resetScore } = useScore(0);
  const [gameHistory, updateGameHistory] = useState([]);
  const [gameStatus, updateGameStatus] = useState(GAME_STARTED);

  const stopGame = () => {
    if (gameStatus === GAME_STARTED) {
      updateGameStatus(GAME_OVER);
    } else {
      props.updateStorage(initState)
    }
  };

  const playAgain = () => {
    updateGameStatus(GAME_STARTED);
    resetScore();
  };

  const saveGameHistory = async (timeLimit) => {
    updateGameStatus(GAME_OVER);
    let { data: newScore } = await fetcher("/game/update", {
      method: "POST",
      body: { score: score + timeLimit },
    });
    updateGameHistory([...gameHistory, newScore]);
  };

  useEffect(() => {
    const getHistory = fetcher("/game/get-history", { method: "GET" });
    try {
      getHistory.then((response) => {
        updateGameHistory(response.data);
      });
    } catch (err) {
      throw err;
    }
  }, []);
  return (
    <div className="flex_column">
      <div className="game-container">
        <PlayerInfo {...props} />
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
              {...props}
            />
          ) : (
            <GameOver
              gameHistory={gameHistory}
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

export default Game
