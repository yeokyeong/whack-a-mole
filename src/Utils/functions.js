import { useEffect, useRef } from "react";
import { GAME_DATA_KEY, HISTORY_KEY } from "./constants";

const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
};

/* get random */
const getRandomFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomIdx = (max) => {
  return Math.floor(Math.random() * max);
};

/* local storage */
const setGameStorage = (data) => {
  let fetchedData = getGameStorage(GAME_DATA_KEY);
  fetchedData = { ...fetchedData, ...data };
  localStorage.setItem(GAME_DATA_KEY, JSON.stringify(fetchedData));
};
const getGameStorage = () => {
  let data;
  try {
    data = localStorage.getItem(GAME_DATA_KEY)
      ? JSON.parse(localStorage.getItem(GAME_DATA_KEY))
      : {};
  } catch (error) {
    data = {};
  }
  return data;
};
const setHistoryStorage = (data) => {
  let fetchedData = getHistoryStorage();
  fetchedData = [...fetchedData, data];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(fetchedData));
};
const getHistoryStorage = () => {
  let data;
  try {
    data = localStorage.getItem(HISTORY_KEY)
      ? JSON.parse(localStorage.getItem(HISTORY_KEY))
      : [];
  } catch (error) {
    data = [];
  }
  return data;
};

export {
  useUpdateEffect,
  getRandomFromInterval,
  getRandomIdx,
  setGameStorage,
  getGameStorage,
  setHistoryStorage,
  getHistoryStorage
};
