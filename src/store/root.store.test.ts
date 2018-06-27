import createStore from "./root.store";

const nodeEnv = process.env.NODE_ENV;

describe("[store]", () => {
  const initialState = {};

  afterEach(() => {
    window.isServer = undefined;
    process.env.NODE_ENV = nodeEnv;
  });

  it("initialises with NODE_ENV=development on the client", () => {
    window.isServer = false;
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = (middleware: any) => middleware;
    process.env.NODE_ENV = "development";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("initialises with NODE_ENV=development on the server", () => {
    window.isServer = true;
    process.env.NODE_ENV = "development";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("initialises with NODE_ENV=production on the client", () => {
    window.isServer = false;
    process.env.NODE_ENV = "production";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("initialises with NODE_ENV=production on the server", () => {
    window.isServer = true;
    process.env.NODE_ENV = "production";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("initialises with NODE_ENV=test", () => {
    process.env.NODE_ENV = "test";
    const underTest = createStore(initialState);
    expect(underTest).toBeDefined();
  });

  it("merges in initial state correctly", () => {
    const underTest = createStore({
      page: { isLoading: true }
    });
    expect(underTest.getState().page.isLoading).toBe(true);
  });
});
