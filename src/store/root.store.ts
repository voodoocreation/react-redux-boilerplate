import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers/root.reducers";
import rootSaga from "../sagas/root.sagas";
import { createApiWith, createPortsWith } from "../services/configureApi";
// import { createOfflineStorage } from "../services/configureOfflineStorage";

const isSSR = typeof window === "undefined";
const hasGA = !isSSR && typeof window.ga !== "undefined";

export default () => {
  // Middleware
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  // Redux devtools
  let composeEnhancers = compose;
  if (!isSSR && process.env.NODE_ENV === "development") {
    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // Redux store
  // const offlineStorage = createOfflineStorage();
  const ports = createPortsWith({
    apiUrl: "/api/"
  });
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  const saga = rootSaga({
    analytics: hasGA ? window.ga.bind(window) : undefined,
    api: createApiWith(ports)
  });
  sagaMiddleware.run(saga);

  return store;
};
