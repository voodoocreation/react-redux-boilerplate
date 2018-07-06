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

export const setLocalStorage = (key: string, data: string) => {
  if (isLocalStorageAvailable()) {
    window.localStorage.setItem(key, data);
    return { ok: true, data };
  }

  return { ok: false, message: "unavailable" };
};

export const getLocalStorage = (key: string) =>
  isLocalStorageAvailable()
    ? { ok: true, data: window.localStorage.getItem(key) }
    : { ok: false, message: "unavailable" };

export const removeLocalStorage = (key: string) => {
  if (isLocalStorageAvailable()) {
    window.localStorage.removeItem(key);
    return { ok: true, data: key };
  }

  return { ok: false, message: "unavailable" };
};
