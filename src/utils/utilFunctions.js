import {
  DEFAULT_INTERVAL_TIME,
  DIFFICULTY_LEVEL,
  EASY_LEVEL,
  MEDIUM_LEVEL,
  PRIORITY_LEVEL_FOR_EASY,
  PRIORITY_LEVEL_FOR_MEDIUM,
} from "./constants";

function pickRandomWordFromList(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

function formatTime(time) {
  const secondCounter = time % 60;
  const minuteCounter = Math.floor(time / 60);

  const formatedSeconds =
    `${secondCounter}`.length === 1 ? `0${secondCounter}` : secondCounter;
  const formatedMinutes =
    `${minuteCounter}`.length === 1 ? `0${minuteCounter}` : minuteCounter;
  return `${formatedMinutes}:${formatedSeconds}`;
}

function calculateTimerValueinSec({ length = 1, difficultyFactor = 1 }) {
  const timerValue = length / difficultyFactor;
  return timerValue < DEFAULT_INTERVAL_TIME
    ? DEFAULT_INTERVAL_TIME
    : Math.round(timerValue);
}

function getDifficultyLevel(difficultyFactor) {
  if (difficultyFactor <= PRIORITY_LEVEL_FOR_EASY) {
    return EASY_LEVEL;
  } else if (difficultyFactor <= PRIORITY_LEVEL_FOR_MEDIUM) {
    return MEDIUM_LEVEL;
  } else {
    return DIFFICULTY_LEVEL;
  }
}

function getRandomWordAndTimerValue({ data = [], difficultyFactor }) {
  if (!data.length) throw new Error("Non empty List");
  if (!difficultyFactor) throw new Error("Difficulty level needed");

  try {
    let { word = "RANDOM" } = pickRandomWordFromList(data);
    let timeLimit = calculateTimerValueinSec({
      length: word.length,
      difficultyFactor,
    });
    return { word, timeLimit };
  } catch (err) {
    throw err;
  }
}

export {
  pickRandomWordFromList,
  formatTime,
  calculateTimerValueinSec,
  getDifficultyLevel,
  getRandomWordAndTimerValue,
};
