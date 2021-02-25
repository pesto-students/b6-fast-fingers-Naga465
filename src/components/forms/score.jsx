import React from "react";
import { formatTime } from "../../utils/utilFunctions";

const ScoreItem = ({ game_index, score ,bestScore }) => {
  return (
    <div key ={game_index} className="flex_row">
      <p className="color-white score-text">{`Game ${game_index + 1} : `}</p>
      <p style={{ paddingLeft: 8 }} className="color-white score-text">
        {formatTime(score)}
      </p>
      {bestScore && <label className='best_score'>Best</label>}
    </div>
  );
};

const ScoreCard = ({ gameHistory = [] }) => {
    const maxScore = Math.max(...gameHistory)
  return (
    <div className="score_history flex_column">
      <h2> Score Board</h2>
      {gameHistory.map((score, index) => (
        <ScoreItem key = {index} bestScore = {maxScore === score} game_index={index} score={score} />
      ))}
    </div>
  );
};

export default ScoreCard;
