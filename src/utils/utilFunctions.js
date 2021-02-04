import data from "../data/dictionary.json";
import {
  DEFAULT_INTERVAL_TIME,
  DIFFICULTY_LEVEL,
  EASY_LEVEL,
  GAME_LEVELS,
  MEDIUM_LEVEL,
  PRIORITY_LEVEL_FOR_DIFFICULTY,
  PRIORITY_LEVEL_FOR_EASY,
  PRIORITY_LEVEL_FOR_MEDIUM,
} from "./constants";

function getData() {
  let dictionaryData = data;
  let filterFunc = null;
  try {
    let dictionaryDataByLevels = GAME_LEVELS.reduce((prev, game_level) => {
      switch (game_level) {
        case EASY_LEVEL: {
          filterFunc = (word) => word.length <= 4;
          break;
        }
        case MEDIUM_LEVEL: {
          filterFunc = (word) => word.length >= 5 && word.length <= 8;
          break;
        }
        case DIFFICULTY_LEVEL: {
          filterFunc = (word) => word.length >= 8;
          break;
        }
        default: {
        }
      }
      const { filteredData, remaningData } = filterDataByLevel({
        filterFunc,
        dictionaryData,
      });
      dictionaryData = remaningData;
      return { ...prev, [game_level]: filteredData };
    }, {});
    return dictionaryDataByLevels;
  } catch (err) {
    throw err;
  }
}

function filterDataByLevel({ filterFunc, dictionaryData }) {
  if (typeof filterFunc != "function") {
    throw TypeError("Filter funtion should be funtion");
  }
  let chunkData = chunks(dictionaryData, 500);
  let filteredData = [];
  let remaningData = [];

  for (let ele of chunkData) {
    let chunkValues = ele.reduce(
      (prev, word) => {
        if (filterFunc(word)) {
          prev = { ...prev, filteredData: [...prev.filteredData, word] };
        } else {
          prev = { ...prev, remaningData: [...prev.remaningData, word] };
        }
        return prev;
      },
      { filteredData: [], remaningData: [] }
    );
    filteredData = [...filteredData, ...chunkValues.filteredData];
    remaningData = [...remaningData, ...chunkValues.remaningData];
  }

  return { filteredData, remaningData };
}

function chunks(list = [], numOfChunks) {
  let chunked = [];
  for (let ele of list) {
    let last = chunked[chunked.length - 1];
    if (!last || last.length === numOfChunks) {
      chunked.push([ele]);
    } else {
      last.push(ele);
    }
  }
  return chunked;
}

function pickRandomWordFromList({ data = [], level }) {
  if (!level) {
    throw new Error("level is not defined");
  }
  const filteredList = data[level];
  return filteredList[Math.floor(Math.random() * filteredList.length)];
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

function getDifficultyFactor(gameLevel) {
  switch (gameLevel) {
    case EASY_LEVEL:
      return PRIORITY_LEVEL_FOR_EASY;
    case MEDIUM_LEVEL:
      return PRIORITY_LEVEL_FOR_MEDIUM;
    case DIFFICULTY_LEVEL:
      return PRIORITY_LEVEL_FOR_DIFFICULTY;
    default:
      return PRIORITY_LEVEL_FOR_EASY;
  }
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

function getRandomWordAndTimerValue({
  dictionaryData = [],
  difficultyLevel,
  difficultyFactor,
}) {
  let word = pickRandomWordFromList({
    data: dictionaryData,
    level: difficultyLevel,
  });
  let timerValue = calculateTimerValueinSec({
    length: word.length,
    difficultyFactor,
  });

  return { word, timerValue };
}

export {
  getData,
  pickRandomWordFromList,
  formatTime,
  calculateTimerValueinSec,
  getDifficultyFactor,
  getDifficultyLevel,
  getRandomWordAndTimerValue,
};
