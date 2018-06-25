import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "../actions/root.actions";

export const initialState: IPageReducers = {
  error: undefined,
  isLoading: false,
  transitioningTo: undefined
};

export default reducerWithInitialState(initialState)
  .case(actions.changeRoute.started, (state, payload) => ({
    ...state,
    error: undefined,
    isLoading: true,
    transitioningTo: payload
  }))

  .case(actions.changeRoute.done, state => ({
    ...state,
    isLoading: false,
    transitioningTo: undefined
  }))

  .case(actions.changeRoute.failed, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    transitioningTo: undefined
  }));
