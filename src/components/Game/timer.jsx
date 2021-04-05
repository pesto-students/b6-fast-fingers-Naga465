/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from "react";
import CircleTimer from "../forms/circleTimer.jsx";
import TextInput from "../forms/textInput.jsx";
import useCounter from "./hooks/counter";
import useWord from "./hooks/word";

function Timer({
  updateScore,
  gameOver,
  gameLevel = "easy_level",
  updateStorage,
}) {
  const timer = useRef(null);
  const { counter, setCounter, resetCounter } = useCounter(0);
  const { word, timeLimit, resetWord, textValue, setTextValue } = useWord({
    gameLevel,
    initialDFactorValue: 1,
    updateStorage,
  });

  useEffect(() => {
    timer.current = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => {
      clearInterval(timer.current);
      updateScore((score) => score + timeLimit);
      resetCounter();
    };
  }, [word,timeLimit]);

  useEffect(() => {
    if (counter === timeLimit) {
      clearTimeout(timer.current);
      resetWord();
      gameOver(timeLimit);
      return;
    }
  }, [counter]);

  return (
    <div className="flex_column">
      <CircleTimer timeLimit={timeLimit - 1} counter={counter} />
      <div>
        <div
          style={{ alignItems: "center", justifyContent: "center" }}
          className="flex_row"
        >
          {Array.from(word).map((character, index) => (
            <h2
              key={index}
              style={{
                color:
                  character === textValue.charAt(index).toLowerCase()
                    ? "green"
                    : index <= textValue.length - 1
                    ? "blue"
                    : "white",
              }}
              className="word-label"
            >
              {character.toUpperCase()}
            </h2>
          ))}
        </div>
        <TextInput
          input_class="input-box"
          onChange={({ target: { value } }) => setTextValue(value)}
          value={textValue.toUpperCase()}
          autoFocus = {true}

        />
      </div>
    </div>
  );
}

export default Timer
