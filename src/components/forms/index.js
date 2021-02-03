import React from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/constants";
import { formatTime } from "../../utils/utilFunctions";

const CIRCLE_ARC_LENGTH = 283;

const APP_HEADER = () => {
  return (
    <div className="flex_column">
      <img
        style={{ width: 200 }}
        alt="keyboard-logo"
        src={`${PUBLIC_IMAGE_PATH}/keyboard-icon.svg`}
      />
      <label className="header_label">fast fingers</label>
      <div
        style={{ alignItems: "center", justifyContent: "space-between" }}
        className="flex_row"
      >
        <div className="header_line"></div>
        <p className = 'color-default' style={{ paddingRight: 8, paddingLeft: 8 }}>
          {`the ultimate typing game`}
        </p>
        <div className="header_line"></div>
      </div>
    </div>
  );
};

const ScoreItem = ({ game_index, score }) => {
  return (
    <div className="flex_row">
      <p className="color-white score-text">{`Game ${game_index + 1} : `}</p>
      <p style ={{paddingLeft:8}} className="color-white score-text">{formatTime(score)}</p>
    </div>
  );
};

const calcualteRemaingArc = ({ timeLimit, counter }) => {
  const timeLeft = timeLimit - counter;
  const ARC_LENGTH_PER_ONE_MINIUTE = CIRCLE_ARC_LENGTH / timeLimit;
  return Math.round(timeLeft * ARC_LENGTH_PER_ONE_MINIUTE);
};

const CircleTimer = ({ counter, timeLimit }) => {
  return (
    <div  className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle
            className="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            strokeDasharray={`${calcualteRemaingArc({
              timeLimit,
              counter,
            })} ${CIRCLE_ARC_LENGTH}`}
            id="base-timer-path-remaining"
            className="base-timer__path-remaining "
            style={{ color: '#ff5155' }}
            d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">
        {formatTime(timeLimit - counter)}
      </span>
    </div>
  );
};

export const GameOver = ({ gameIndex, score, onRestartGame, ...rest }) => {
  return (
    <div style={{ alignItems: "center" }} className="flex_column">
      <h2 className="color-white"> {`SCORE : GAME${gameIndex} `}</h2>
      <h1 className="color-white"> {formatTime(score)}</h1>
      <div
        onClick={onRestartGame}
        style={{ alignItems: "center" }}
        className="flex_row"
      >
        <img
          className = 'image_width'
          src={`${PUBLIC_IMAGE_PATH}/reload-icon.svg`}
          alt="restart game"
        ></img>
        <h1 style={{ paddingLeft: 15 }} className="color-default">
          PLAY AGAIN
        </h1>
      </div>
    </div>
  );
};

export { APP_HEADER, ScoreItem, CircleTimer };
