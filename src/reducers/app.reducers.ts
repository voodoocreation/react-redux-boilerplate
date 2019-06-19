import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "../actions/root.actions";
import { error, IError } from "../models/root.models";

export interface IState {
  currentRoute?: string;
  error?: IError;
  isLoading: boolean;
  transitioningTo?: string;
}

export const initialState: IState = {
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

  .case(actions.changeRoute.failed, (state, payload) => ({
    ...state,
    error: error(payload.error),
    isLoading: false,
    transitioningTo: undefined
  }));
