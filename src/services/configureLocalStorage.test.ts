import {
  getLocalStorage,
  isLocalStorageAvailable,
  removeLocalStorage,
  setLocalStorage
} from "./configureLocalStorage";

const g: any = global;
const store: { [index: string]: string | null } = {};

describe("[services] Local storage", () => {
  const testValue = "__localStorageTest__";

  describe("when feature is available", () => {
    beforeEach(() => {
      g.localStorage = {
        getItem: jest.fn((key: string) => store[key]),
        removeItem: jest.fn((key: string) => {
          store[key] = null;
        }),
        setItem: jest.fn((key: string, value: any) => {
          store[key] = value;
        })
      };
    });

    it("detects local storage feature correctly when available", () => {
      expect(isLocalStorageAvailable()).toBe(true);
    });

    it("setLocalStorage() stores data correctly", () => {
      const result = setLocalStorage(testValue, testValue);
      expect(window.localStorage.setItem).toHaveBeenCalled();
      expect(result).toEqual({ data: testValue, ok: true });
      expect(store[testValue]).toBe(testValue);
    });

    it("getLocalStorage() retrieves data correctly", () => {
      const result = getLocalStorage(testValue);
      expect(window.localStorage.getItem).toHaveBeenCalled();
      expect(result).toEqual({ data: testValue, ok: true });
    });

    it("removeLocalStorage() removes data correctly", () => {
      const result = removeLocalStorage(testValue);
      expect(window.localStorage.removeItem).toHaveBeenCalled();
      expect(result).toEqual({ data: testValue, ok: true });
      expect(getLocalStorage(testValue)).toEqual({ data: null, ok: true });
    });
  });

  describe("when feature is unavailable", () => {
    beforeEach(() => {
      g.localStorage = undefined;
    });

    it("detects absence of feature correctly", () => {
      expect(isLocalStorageAvailable()).toBe(false);
    });

    it("setLocalStorage() returns error correctly", () => {
      const result = setLocalStorage(testValue, testValue);
      expect(result).toEqual({ message: "unavailable", ok: false });
    });

    it("getLocalStorage() returns error correctly", () => {
      const result = getLocalStorage(testValue);
      expect(result).toEqual({ message: "unavailable", ok: false });
    });

    it("removeLocalStorage() returns error correctly", () => {
      const result = removeLocalStorage(testValue);
      expect(result).toEqual({ message: "unavailable", ok: false });
    });
  });
});
