import { combineReducers } from 'redux';
import example from './example.reducers';

export function rootReducer(reducers = {}) {
  return combineReducers({
    example,
    ...reducers,
  });
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  const asyncReducers = { ...store.asyncReducers, [key]: reducer };
  // eslint-disable-next-line no-param-reassign
  store.asyncReducers = asyncReducers;
  store.replaceReducer(rootReducer(asyncReducers));
};

export const ejectReducer = (store, { key }) => {
  if (!Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  const asyncReducers = { ...store.asyncReducers };
  delete asyncReducers[key];
  // eslint-disable-next-line no-param-reassign
  store.asyncReducers = asyncReducers;
  store.replaceReducer(rootReducer(asyncReducers));
};

export default { rootReducer, injectReducer };
