import { APP_ID } from "../constants/app.constants";
import { failure, success } from "../models/root.models";
import {
  configureLocalStorage,
  configureMockLocalStorage,
  isLocalStorageAvailable,
} from "./configureLocalStorage";

describe("[services] Local storage", () => {
  const testValue = "__localStorageTest__";

  describe("configureLocalStorage", () => {
    const localStore: Record<string, string | null> = {};

    describe("when the local storage feature is available", () => {
      const ls = configureLocalStorage();

      beforeAll(() => {
        Object.defineProperty(global, "localStorage", {
          value: {
            getItem: jest.fn((key) => localStore[key]),
            removeItem: jest.fn((key) => {
              localStore[key] = null;
            }),
            setItem: jest.fn((key, value) => {
              localStore[key] = value;
            }),
          },
          writable: true,
        });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it("detects the local storage feature correctly when available", () => {
        expect(isLocalStorageAvailable()).toBe(true);
      });

      it(".set() stores data correctly", () => {
        const result = ls.set(testValue, testValue);

        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          `${APP_ID}--${testValue}`,
          JSON.stringify(testValue)
        );
        expect(result).toEqual(success(testValue));
      });

      it(".get() retrieves data correctly", () => {
        ls.set(testValue, testValue);
        const result = ls.get(testValue);

        expect(window.localStorage.getItem).toHaveBeenCalledWith(
          `${APP_ID}--${testValue}`
        );
        expect(result).toEqual(success(testValue));
      });

      it(".remove() removes data correctly", () => {
        ls.set(testValue, testValue);
        const result = ls.remove(testValue);

        expect(window.localStorage.removeItem).toHaveBeenCalledWith(
          `${APP_ID}--${testValue}`
        );
        expect(result).toEqual(success(testValue));
        expect(ls.get(testValue)).toEqual(success(null));
      });
    });

    describe("when the local storage feature is unavailable", () => {
      const ls = configureLocalStorage();

      beforeAll(() => {
        Object.defineProperty(global, "localStorage", {
          value: undefined,
          writable: true,
        });
      });

      it("detects absence of the feature correctly", () => {
        expect(isLocalStorageAvailable()).toBe(false);
      });

      it("setLocalStorage() returns a failure", () => {
        const result = ls.set(testValue, testValue);
        expect(result).toEqual(failure("unavailable"));
      });

      it("getLocalStorage() returns a failure", () => {
        const result = ls.get(testValue);
        expect(result).toEqual(failure("unavailable"));
      });

      it("removeLocalStorage() returns a failure", () => {
        const result = ls.remove(testValue);
        expect(result).toEqual(failure("unavailable"));
      });
    });
  });

  describe("configureMockLocalStorage", () => {
    const ls = configureMockLocalStorage();

    it(".set() binds mocks and stores data correctly", () => {
      const result = ls.set(testValue, testValue);

      expect(ls.set).toHaveBeenCalledWith(testValue, testValue);
      expect(result).toEqual(success(testValue));
    });

    it(".get() binds mocks and retrieves data correctly", () => {
      ls.set(testValue, testValue);
      const result = ls.get(testValue);

      expect(ls.get).toHaveBeenCalledWith(testValue);
      expect(result).toEqual(success(testValue));
    });

    it(".remove() binds mocks and removes data correctly", () => {
      ls.set(testValue, testValue);
      const result = ls.remove(testValue);

      expect(ls.remove).toHaveBeenCalledWith(testValue);
      expect(result).toEqual(success(testValue));
      expect(ls.get(testValue)).toEqual(success(null));
    });
  });
});
