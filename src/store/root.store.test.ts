import { createStore } from "./root.store";

const nodeEnv = process.env.NODE_ENV;

describe("[store] Redux store", () => {
  afterEach(() => {
    window.isServer = undefined;
    process.env.NODE_ENV = nodeEnv;
  });

  it("initialises with NODE_ENV=development on the client", () => {
    window.isServer = false;
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = (middleware: any) =>
      middleware;
    process.env.NODE_ENV = "development";
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("initialises with NODE_ENV=development on the client, without Redux devtools", () => {
    window.isServer = false;
    process.env.NODE_ENV = "development";
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("initialises with NODE_ENV=development on the server", () => {
    window.isServer = true;
    process.env.NODE_ENV = "development";
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("initialises with NODE_ENV=production on the client", () => {
    window.isServer = false;
    process.env.NODE_ENV = "production";
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("initialises with NODE_ENV=production on the server", () => {
    window.isServer = true;
    process.env.NODE_ENV = "production";
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("initialises with NODE_ENV=test", () => {
    process.env.NODE_ENV = "test";
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("initialises when Google Tag Manager API is available", () => {
    window.dataLayer = [];
    const store = createStore();

    expect(store).toBeDefined();
  });

  it("merges in initial state correctly", () => {
    const store = createStore({
      app: { isLoading: true }
    });

    expect(store.getState().app.isLoading).toBe(true);
  });
});
