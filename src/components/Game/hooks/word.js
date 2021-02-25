import { useCallback, useEffect, useRef, useState } from "react";
import { DIFFICULTY_FACTOR_INCREASE } from "../../../utils/constants";
import { getRandomWordAndTimerValue } from "../../../utils/utilFunctions";

export default function useWord({
  initialTimeLimit = 5,
  initialDFactorValue = 1,
  initialWord = "start",
  initialTextValue = "",
  data = [],
}) {
  const [word, setWord] = useState(initialWord);
  const [timeLimit, setTimerValue] = useState(initialTimeLimit);
  const [textValue, setTextValue] = useState(initialTextValue);

  const difficultyFactor = useRef(initialDFactorValue);

  const resetWord = useCallback(() => {
    setWord(initialWord);
    setTimerValue(initialTimeLimit);
    setTextValue(initialTextValue);
    difficultyFactor.current = initialDFactorValue;
  }, [initialWord, initialDFactorValue, initialTimeLimit, initialTextValue]);

  useEffect(() => {
    function nextWord() {
      let { word, timeLimit } = getRandomWordAndTimerValue({
        data,
        difficultyFactor: difficultyFactor.current,
      });
      setWord(word);
      setTimerValue(timeLimit);
      setTextValue("");
    }

    if (word === textValue.toLowerCase()) {
      difficultyFactor.current =
        difficultyFactor.current + DIFFICULTY_FACTOR_INCREASE;
      nextWord();
    }
  }, [word, textValue, data]);


  return { word, resetWord, timeLimit, textValue, setTextValue };
}
