import configureOfflineStorage from "./configureOfflineStorage";

const g: any = global;
const store: { [index: string]: string | null } = {};

describe("[services] Offline storage", () => {
  const testValue = "__offlineStorageTest__";
  const offlineStorage = configureOfflineStorage();

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

  it("initialises correctly", () => {
    expect(offlineStorage).toBeDefined();
    expect(typeof offlineStorage.set).toBe("function");
    expect(typeof offlineStorage.get).toBe("function");
  });

  it("sets data correctly", () => {
    const result = offlineStorage.set(testValue, testValue);
    expect(window.localStorage.setItem).toHaveBeenCalled();
    expect(result).toEqual({ data: testValue, ok: true });
  });

  it("sets data correctly", () => {
    const result = offlineStorage.get(testValue);
    expect(window.localStorage.getItem).toHaveBeenCalled();
    expect(result).toEqual({ data: testValue, ok: true });
  });

  it("removes data correctly", () => {
    const result = offlineStorage.remove(testValue);
    expect(window.localStorage.removeItem).toHaveBeenCalled();
    expect(result).toEqual({ data: testValue, ok: true });
  });
});
