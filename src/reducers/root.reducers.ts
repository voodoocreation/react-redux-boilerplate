import { IntlState } from "react-intl-redux";
import { combineReducers } from "redux";

import app, {
  initialState as appInitialState,
  IState as IAppState
} from "./app.reducers";
import example, {
  initialState as exampleInitialState,
  IState as IExampleState
} from "./example.reducers";
import intl, { initialState as intlInitialState } from "./intl.reducers";

export interface IStoreState {
  app: IAppState;
  example: IExampleState;
  intl: IntlState;
}

export const initialState: IStoreState = {
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
