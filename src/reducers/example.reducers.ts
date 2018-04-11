import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "../actions/example.actions";

export const initialState: IExampleReducers = {
  apiData: {},
  localData: {
    inputValue: ""
  }
};

export default reducerWithInitialState(initialState)
  .case(actions.fetchApiData.done, (state, payload) => ({
    ...state,
    apiData: payload
  }))
  .case(actions.setLocalData, (state, payload) => ({
    ...state,
    localData: payload
  }));
