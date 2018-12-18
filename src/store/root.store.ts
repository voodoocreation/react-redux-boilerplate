import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";

import { isServer } from "../helpers/dom";
import rootReducer from "../reducers/root.reducers";
import rootSaga from "../sagas/root.sagas";
import { createApiWith, createPortsWith } from "../services/configureApi";

type TStore = Store & {
  sagaTask?: Task;
  runSagaTask?: () => void;
};

export default (initialState = {}, _?: any, api?: {}) => {
  // Environment
  const hasGA = !isServer() && typeof window.dataLayer !== "undefined";
  const hasMaps =
    !isServer() &&
    typeof window.google !== "undefined" &&
    typeof window.google.maps !== "undefined";
  const isDev = process.env.NODE_ENV === "development";

  // Middleware
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  // Redux devtools
  let composeEnhancers = compose;
  if (
    !isServer() &&
    isDev &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  // Redux store
  // const offlineStorage = createOfflineStorage();
  const ports = createPortsWith({
    apiUrl: `http://localhost:5000/mock-api`
  });
  const store: TStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  const saga = rootSaga({
    api: api ? api : createApiWith(ports),
    dataLayer: hasGA ? window.dataLayer : [],
    maps: hasMaps ? window.google.maps : undefined
  });
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(saga);
  };
  store.runSagaTask();

  return store;
};
