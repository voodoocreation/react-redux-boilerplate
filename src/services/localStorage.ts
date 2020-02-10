import { failure, success } from "../models/response.models";

export const isLocalStorageAvailable = () => {
  const { localStorage } = window;

  try {
    const value = "__storage_test__";
    localStorage.setItem(value, value);
    localStorage.removeItem(value);

    return true;
  } catch (error) {
    return false;
  }
};

export function setLocalStorage(key: string, data: string) {
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(key, data);
    return success(data);
  }

  return failure("unavailable");
}

export const getLocalStorage = (key: string) =>
  isLocalStorageAvailable()
    ? success(window.localStorage.getItem(key))
    : failure("unavailable");

export const removeLocalStorage = (key: string) => {
  if (isLocalStorageAvailable()) {
    window.localStorage.removeItem(key);
    return success(key);
  }

  return failure("unavailable");
};
