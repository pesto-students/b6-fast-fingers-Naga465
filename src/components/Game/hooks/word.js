/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import fetcher from "../../../api";
import { DIFFICULTY_FACTOR_INCREASE } from "../../../utils/constants";
import {
  getDifficultyLevel,
  getRandomWordAndTimerValue,
} from "../../../utils/utilFunctions";

export default function useWord({
  initialTimeLimit = 5,
  initialDFactorValue = 1,
  initialWord = '',
  initialTextValue = "",
  gameLevel,
  updateStorage,
}) {
  const [word, setWord] = useState(initialWord);
  const [timeLimit, setTimerValue] = useState(initialTimeLimit);
  const [textValue, setTextValue] = useState(initialTextValue);
  const [words, updateWords] = useState([]);
  const difficultyFactor = useRef(initialDFactorValue);

  const resetWord = useCallback(() => {
    setWord(initialWord);
    setTimerValue(initialTimeLimit);
    setTextValue(initialTextValue);
    difficultyFactor.current = initialDFactorValue;
  }, [initialWord, initialDFactorValue, initialTimeLimit, initialTextValue]);

  function nextWord(data = words) {
    let { word, timeLimit } = getRandomWordAndTimerValue({
      data,
      difficultyFactor: difficultyFactor.current,
    });
    setWord(word);
    setTimerValue(timeLimit);
    setTextValue("");
  }

  useEffect(() => {
    if (word === textValue.toLowerCase() && !!word) {
      try {
        difficultyFactor.current =
          difficultyFactor.current + DIFFICULTY_FACTOR_INCREASE;
        let { key: nextLevel } = getDifficultyLevel(difficultyFactor.current);
        if (nextLevel !== gameLevel) {
          updateStorage((state) => ({...state, gameLevel : nextLevel}));
          return;
        }
        nextWord();
      } catch (err) {
        throw err;
      }
    }
  }, [word, textValue]);

  useEffect(() => {
    async function getWords() {
      try {
        let { data = [] } = await fetcher(`/getword/${gameLevel}`, {
          method: "GET",
        });
        updateWords(data);
        nextWord(data);
      } catch (err) {
        throw err;
      }
    }
    getWords();
  }, [gameLevel]);

  return { word, resetWord, timeLimit, textValue, setTextValue };
}
