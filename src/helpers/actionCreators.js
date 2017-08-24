import { createAction } from 'redux-actions';

export const createReduxAction = reducerName => (actionName, payloadCreator = null) => {
  const newActionName = `ACTION/${reducerName}/${actionName}`;
  return createAction(newActionName, payloadCreator);
};

export const createSignalAction = reducerName => base =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev, curr) => {
    const data = prev;
    data[curr] = `SIGNAL/${reducerName}/${base}/${curr}`;
    data[curr.toLowerCase()] = createAction(data[curr]);
    return data;
  }, {});
