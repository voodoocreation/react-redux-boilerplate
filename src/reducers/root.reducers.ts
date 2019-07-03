import { combineReducers } from "redux";

import app, { initialState as appInitialState } from "./app.reducers";
import example, {
  initialState as exampleInitialState
} from "./example.reducers";
import intl, { initialState as intlInitialState } from "./intl.reducers";

export const initialState = {
  app: appInitialState,
  example: exampleInitialState,
  intl: intlInitialState
};

const rootReducer = combineReducers({
  app,
  example,
  intl
});

export default rootReducer;

export type TStoreState = typeof initialState;
