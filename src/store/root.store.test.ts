import createStore from "./root.store";

const nodeEnv = process.env.NODE_ENV;

describe("Store", () => {
  const initialState = {};

  beforeEach(() => {
    process.env.NODE_ENV = nodeEnv;
  });

  it("works with NODE_ENV=development", () => {
    process.env.NODE_ENV = "development";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("works with NODE_ENV=production", () => {
    process.env.NODE_ENV = "production";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("works with NODE_ENV=test", () => {
    process.env.NODE_ENV = "test";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });
});
