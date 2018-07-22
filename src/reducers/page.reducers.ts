import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "../actions/root.actions";

export const initialState: IPageReducers = {
  currentRoute: undefined,
  error: undefined,
  isLoading: false,
  transitioningTo: undefined
};

export default reducerWithInitialState(initialState)
  .case(actions.setCurrentRoute, (state, payload) => ({
    ...state,
    currentRoute: payload
  }))

  .case(actions.changeRoute.started, (state, payload) => ({
    ...state,
    error: undefined,
    isLoading: true,
    transitioningTo: payload
  }))

  .case(actions.changeRoute.done, (state, { params }) => ({
    ...state,
    currentRoute: params,
    isLoading: false,
    transitioningTo: undefined
  }))

  .case(actions.changeRoute.failed, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    transitioningTo: undefined
  }));
