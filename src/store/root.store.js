import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers/root.reducers';
import { rootSaga } from '../sagas/root.sagas';
import configureApi from '../services/configureApi';

export default function initStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
  ];

  const reducer = [
    rootReducer(),
  ];

  const enhancers = [];

  const api = configureApi({
    options: {
      appClientName: 'app',
    },
  });

  const saga = rootSaga({
    api,
  });

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  const store = createStore(
    ...reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  store.asyncReducers = {};
  store.asyncSagas = {};
  store.sagaMiddleware = sagaMiddleware;

  store.getSaga = name => store.asyncSagas[name];

  store.addSaga = (name, iterator) => {
    store.asyncSagas[name] = iterator;
  };

  store.removeSaga = (name) => {
    delete store.asyncSagas[name];
  };

  sagaMiddleware.run(saga);

  return store;
}
