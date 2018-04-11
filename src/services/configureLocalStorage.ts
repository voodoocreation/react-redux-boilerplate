let LOCAL_STORAGE_INFO = "none";

const { localStorage } = window;

try {
  localStorage.setItem("__has_offline_storage", "it works");
  localStorage.removeItem("__has_offline_storage");
  LOCAL_STORAGE_INFO = "localStorage";
} catch (err) {
  LOCAL_STORAGE_INFO = err.toString();
  // tslint:disable-next-line no-console
  console.log(LOCAL_STORAGE_INFO);

  if (window.ga) {
    window.ga("send", "exception", {
      exDescription: LOCAL_STORAGE_INFO,
      exFatal: false
    });
  }
}

export function setLocalStorage(keyName: string, data: string) {
  if (getLocalStorageInfo() === "localStorage") {
    try {
      localStorage.setItem(keyName, data);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, message: err.toString() };
    }
  }

  return { ok: false, message: LOCAL_STORAGE_INFO };
}

export function getLocalStorage(keyName: string) {
  if (getLocalStorageInfo() === "localStorage") {
    try {
      const res = localStorage.getItem(keyName);
      return { ok: true, data: res };
    } catch (err) {
      return { ok: false, message: err.toString() };
    }
  }

  return { ok: false, message: LOCAL_STORAGE_INFO };
}

export function getLocalStorageInfo(): "none" | "localStorage" | string {
  return LOCAL_STORAGE_INFO;
}
