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
      bestScore: {},
      score: 0,
      timerValue,
      word,
      difficultyFactor,
      difficultyLevel,
      data,
    };
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between  ",
          paddingLeft: 30,
          paddingRight: 30,
          alignItems: "flex-start",
        }}
      >
        <History />
        <Timer
          onScoreChange={(score) => this.setState({ score })}
          {...this.state}
        />
        <Score value={this.state.score} />
      </div>
    );
  }
}

export default Game;
