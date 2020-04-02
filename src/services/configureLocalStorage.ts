import { APP_ID } from "../constants/app.constants";
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

export const configureLocalStorage = () => ({
  get: (key: string) =>
    isLocalStorageAvailable()
      ? success(
          JSON.parse(window.localStorage.getItem(`${APP_ID}--${key}`) || "null")
        )
      : failure("unavailable"),

  remove: (key: string) => {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(`${APP_ID}--${key}`);
      return success(key);
    }

    return failure("unavailable");
  },

  set: (key: string, data: any) => {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(`${APP_ID}--${key}`, JSON.stringify(data));
      return success(data);
    }

    return failure("unavailable");
  },
});

export const configureMockLocalStorage = () => {
  const localStore: Record<string, string | null> = {};

  return {
    get: jest.fn((key: string) =>
      success(JSON.parse(localStore[`${APP_ID}--${key}`] || "null"))
    ),

    remove: jest.fn((key: string) => {
      delete localStore[`${APP_ID}--${key}`];
      return success(key);
    }),

    set: jest.fn((key: string, data: any) => {
      localStore[`${APP_ID}--${key}`] = JSON.stringify(data);
      return success(data);
    }),
  };
};

export type TLocalStorage = ReturnType<typeof configureLocalStorage>;
