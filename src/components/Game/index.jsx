import React from "react";
import {
  getData,
  getDifficultyFactor,
  getDifficultyLevel,
  getRandomWordAndTimerValue,
} from "../../utils/utilFunctions";
import { UserContext } from "../UserContext";
import History from "./history";
import Score from "./score.jsx";
import Timer from "./timer";
import {
  GAME_OVER,
  GAME_STARTED,
  PUBLIC_IMAGE_PATH,
} from "../../utils/constants";
import { GameOver, ScoreItem } from "../forms";

class Game extends React.Component {
  static contextType = UserContext;

  constructor(props, context) {
    super(props, context);
    const data = getData();
    const { gameLevel } = this.context;

    let difficultyFactor = getDifficultyFactor(gameLevel);
    let difficultyLevel = getDifficultyLevel(difficultyFactor);

    let { timerValue, word } = getRandomWordAndTimerValue({
      dictionaryData: data,
      difficultyLevel,
      difficultyFactor,
    });

    this.state = {
      gameHistory: [],
      bestScore: 0,
      score: 0,
      timerValue,
      word,
      difficultyFactor,
      difficultyLevel,
      data,
      gameStatus: GAME_STARTED,
      isCurrentIsBestScore: true,
    };
  }

  saveGameHistory = () => {
    this.findBestScores();
    this.setState({
      gameStatus: GAME_OVER,
    });
  };

  playAgain = () => {
    this.setState({ gameStatus: GAME_STARTED, score: 0 });
  };

  stopGame = () => {
    if (this.state.gameStatus === GAME_STARTED) {
      this.setState({ gameStatus: GAME_OVER });
    } else {
      this.props.quitGame();
    }
  };

  findBestScores = () => {
    let { gameHistory } = this.state;
    if (!this.state.bestScore) {
      this.setState({ bestScore: this.state.score, gameHistory: [] });
      return;
    }

    if (this.state.score > this.state.bestScore) {
      this.setState({
        bestScore: this.state.score,
        gameHistory: [...gameHistory, this.state.bestScore],
      });
    } else {
      this.setState({
        gameHistory: [...this.state.gameHistory, this.state.score],
      });
    }
  };

  render() {
    return (
      <div className="flex_column">
        <div className="game-container">
          <History gameHistory={this.state.gameHistory} />
          <Score value={this.state.score} />
        </div>
        <div
          style={{ alignItems: "center", width: "90%" }}
          className="flex_row"
        >
          <div className="score_history flex_column">
            <h2> Score Board</h2>
            {this.state.gameHistory.map((gameScore, index) => (
              <ScoreItem key={index} game_index={index} score={gameScore} />
            ))}
            {this.state.bestScore ? (
              <div>
                {" "}
                <label className="color-default"> PERSONAL BEST </label>
                <ScoreItem
                  key={"best"}
                  game_index={this.state.gameHistory.length}
                  score={this.state.bestScore}
                />
              </div>
            ) : (
              <React.Fragment />
            )}
          </div>
          <div style={{ flexGrow: 1 }}>
            {this.state.gameStatus === GAME_STARTED ? (
              <Timer
                onScoreChange={() =>
                  this.setState({ score: this.state.score + 1 })
                }
                gameOver={this.saveGameHistory}
                {...this.state}
              />
            ) : (
              <GameOver
                gameIndex={this.state.gameHistory.length}
                score={this.state.score}
                onRestartGame={this.playAgain}
                isThisBestScore={this.state.score >= this.state.bestScore}
              />
            )}
          </div>
        </div>
        <div style={{ width: "90%", alignItems: "center" }}>
          <div
            style={{ width: 300 }}
            className="flex_row"
            onClick={this.stopGame}
          >
            <img
              alt="stop-game"
              src={`${PUBLIC_IMAGE_PATH}/cross-icon.svg`}
            ></img>
            <h1 style={{ paddingLeft: 15 }} className="color-default">
              {this.state.gameStatus === GAME_STARTED
                ? "STOP GAME"
                : "QUIT GAME"}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
