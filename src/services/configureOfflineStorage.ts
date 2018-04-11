import { getLocalStorage, setLocalStorage } from "./configureLocalStorage";

export const createOfflineStorage = () => ({
  set(keyName: string, data: string) {
    const res = setLocalStorage(keyName, data);

    if (res.ok) {
      return { ok: true, data: res.data };
    } else {
      return { ok: false, data: res.message };
    }
  },
  get(keyName: string) {
    const res = getLocalStorage(keyName);

    if (res.ok) {
      return { ok: true, data: res.data };
    } else {
      return { ok: false, data: res.message };
    }
  }
});
