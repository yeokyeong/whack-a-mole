import { useEffect, useRef } from "react";

const useUpdateEffect = (effect, dependencies = []) => {
  //FIXME
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
};

const getRandomFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomIdx = (max) => {
  return Math.floor(Math.random() * max);
};

const setStorage = (key, data) => {
  let [[dataKey, dataValue]] = Object.entries(data);
  console.log(111, key, dataKey, dataValue);
  let fetchedData = getStorage(key);
  fetchedData[dataKey] = dataValue;
  localStorage.setItem(key, JSON.stringify(fetchedData));
};

const getStorage = (key) => {
  let data = {};
  try {
    data = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : {};
  } catch (error) {
    data = {};
  }
  return data;
};

export {
  useUpdateEffect,
  getRandomFromInterval,
  getRandomIdx,
  setStorage,
  getStorage
};
