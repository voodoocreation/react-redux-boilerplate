import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from "./configureLocalStorage";

const createOfflineStorage = () => ({
  get: (key: string) => getLocalStorage(key),
  remove: (key: string) => removeLocalStorage(key),
  set: (key: string, data: string) => setLocalStorage(key, data)
});

export default createOfflineStorage;
