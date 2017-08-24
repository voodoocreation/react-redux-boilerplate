import { handleActions } from 'redux-actions';

import * as actions from '../actions/example.actions';

export const initialState = {
  apiData: {},
  localData: {
    inputValue: '',
  },
};

const initialActions = {
  [actions.fetchApiData.success]: (state, action) => ({
    ...state,
    apiData: action.payload,
  }),
  [actions.setLocalData]: (state, action) => ({
    ...state,
    localData: action.payload,
  }),
};

export default handleActions(initialActions, initialState);
