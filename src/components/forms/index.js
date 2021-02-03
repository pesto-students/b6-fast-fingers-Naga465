import React from "react";
import { PUBLIC_IMAGE_PATH } from "../../utils/constants";
import { formatTime } from "../../utils/utilFunctions";

const CIRCLE_ARC_LENGTH = 283;


const APP_HEADER = () => {
  return (
    <div className = 'flex_column'>
      <img alt="keyboard-logo" src={`${PUBLIC_IMAGE_PATH}/keyboard-icon.svg`}/>
      <h1 className = 'header_label'>fast fingers</h1>
      {/* <h1 className = 'header_label'>fast fingers</h1> */}
    </div>
  );
};

const ScoreItem = ({game_index,score}) => {
   return(
     <div className = "flex_row">
       <p>{`Game ${game_index} : `}</p>
       <p>{score}</p>
     </div>
   )
}

const calcualteRemaingArc = ({timeLimit,counter}) => {
  const timeLeft  = timeLimit  - counter
  const ARC_LENGTH_PER_ONE_MINIUTE =
    CIRCLE_ARC_LENGTH / timeLimit;
  return Math.round(timeLeft * ARC_LENGTH_PER_ONE_MINIUTE);
};

const CircleTimer = ({counter,timeLimit}) => {
  return (
    <div className="base-timer">
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
              strokeDasharray={`${calcualteRemaingArc({timeLimit,counter})} ${CIRCLE_ARC_LENGTH}`}
              id="base-timer-path-remaining"
              className="base-timer__path-remaining "
              style={{ color:'orange' }}
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
  )
}

export { APP_HEADER, ScoreItem , CircleTimer};
