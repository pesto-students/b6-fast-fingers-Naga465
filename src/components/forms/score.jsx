import React from "react";
import { formatTime } from "../../utils/utilFunctions";

const ScoreItem = ({ game_index, score, bestScore }) => {
  return (
    <div key={game_index} className="flex_row">
      <p className="color-white score-text">{`Game ${game_index + 1} : `}</p>
      <p style={{ paddingLeft: 8 }} className="color-white score-text">
        {formatTime(score)}
      </p>
      {bestScore && <label className="best_score">Best</label>}
    </div>
  );
};

const ScoreCard = ({ gameHistory = [] }) => {
  const maxScoreIndex = gameHistory.reduce(
    (prev, curr, index) => {
      if (curr > prev.value) {
        return { value: curr, index };
      }
      return prev;
    },
    { value: gameHistory[0], index: 0 }
  ).index;

  return (
    <div className="score_history flex_column">
      <h2> Score Board</h2>
      {gameHistory.map((score, index) => (
        <ScoreItem
          key={index}
          bestScore={maxScoreIndex === index}
          game_index={index}
          score={score}
        />
      ))}
    </div>
  );
};

export default ({ gameHistory }) => {
  let memorizedValue = React.useMemo(() => {
    return <ScoreCard gameHistory={gameHistory} />;
  }, [gameHistory]);

  return memorizedValue;
};
