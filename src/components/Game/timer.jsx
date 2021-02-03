/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import { DIFFICULTY_FACTOR_INCREASE } from "../../utils/constants";
import { getRandomWordAndTimerValue } from "../../utils/utilFunctions";
import { CircleTimer } from "../forms";

function Timer({
  data,
  difficultyFactor,
  difficultyLevel,
  word,
  timerValue,
  score = 0,
  onScoreChange,
  gameOver,
}) {
  function resetState() {
    let { word, timerValue } = getRandomWordAndTimerValue({
      dictionaryData: data,
      difficultyFactor: dFactor,
      difficultyLevel,
    });
    updateCounter(0);
    handleUserInputChange("");
    setWord(word);
    setTimeLimit(timerValue);
    setDifficultyfactor((dFactor) => dFactor + DIFFICULTY_FACTOR_INCREASE);
  }

  // -----> State
  const [counter, updateCounter] = useState(0);
  const [userInput, handleUserInputChange] = useState("");
  const [isTimerStart, updateTimerStatus] = useState(true);
  const [randomWord, setWord] = useState(word);
  const [timeLimit, setTimeLimit] = useState(timerValue);
  const [dFactor, setDifficultyfactor] = useState(difficultyFactor);
  const inputRef = useRef("");

  //  ----->  Timer side effect
  useEffect(() => {
    let timer;
    if (isTimerStart) {
      timer = setInterval(() => {
        if (counter === timeLimit) {
          updateTimerStatus(false);
          clearInterval(timer);
          gameOver(score)
          return;
        }
        updateCounter((counter) => counter + 1);
        onScoreChange();
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [counter]);

  // ---->  User Input Side effets
  useEffect(() => {
    if (isTimerStart) {
      if (randomWord === userInput.toLocaleLowerCase()) {
        inputRef.current.value = userInput;
        resetState();
        return;
      }
    }
  }, [userInput]);

  const _handleChange = () => (e) => {
    let { value } = e.target;
    handleUserInputChange(value);
  };

  return (
    <div className ='flex_column'>
      <CircleTimer timeLimit={timeLimit} counter={counter} />
      <div>
        <div
          style={{ alignItems: "center", justifyContent: "center" }}
          className="flex_row"
        >
          {Array.from(randomWord).map((character, index) => (
            <h2
              style={{
                color:
                  character === userInput.charAt(index).toLocaleLowerCase()
                    ? "green"
                    : index <= userInput.length - 1
                    ? "blue"
                    : "white",
              }}
              className="word-label"
            >
              {character.toUpperCase()}
            </h2>
          ))}
        </div>
        <input
          ref={inputRef}
          className="input-box"
          value={userInput.toUpperCase()}
          onChange={_handleChange()}
        ></input>
      </div>
    </div>
  );
}

export default Timer;
