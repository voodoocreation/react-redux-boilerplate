import { applyMiddleware, compose, createStore, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";

import rootReducer from "../reducers/root.reducers";
import rootSaga from "../sagas/root.sagas";
import { createApiWith, createPortsWith } from "../services/configureApi";
// import createOfflineStorage from "../services/configureOfflineStorage";

type TStore = Store & {
  sagaTask?: Task;
  runSagaTask?: () => void;
};

export default (initialState = {}) => {
  // Environment
  const isSSR = typeof window === "undefined" || window.isServer;
  const hasGA = !isSSR && typeof window.dataLayer !== "undefined";
  const hasMaps =
    !isSSR &&
    typeof window.google !== "undefined" &&
    typeof window.google.maps !== "undefined";
  const isDev = process.env.NODE_ENV === "development";

  // Middleware
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  // Redux devtools
  let composeEnhancers = compose;
  if (
    !isSSR &&
    isDev &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  // Redux store
  // const offlineStorage = createOfflineStorage();
  const ports = createPortsWith({
    apiUrl: `http://localhost:${process.env.PORT}/mock-api`
  });
  const store: TStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  const saga = rootSaga({
    api: createApiWith(ports),
    dataLayer: hasGA ? window.dataLayer : [],
    maps: hasMaps ? window.google.maps : undefined
  });
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(saga);
  };
  store.runSagaTask();

  return store;
};
