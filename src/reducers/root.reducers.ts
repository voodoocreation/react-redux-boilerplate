import { combineReducers } from "redux";

import app, {
  initialState as appInitialState,
  IState as IAppState
} from "./app.reducers";
import example, {
  initialState as exampleInitialState,
  IState as IExampleState
} from "./example.reducers";

export interface IStoreState {
  app: IAppState;
  example: IExampleState;
}

export const initialState = {
  app: appInitialState,
  example: exampleInitialState
};

const rootReducer = combineReducers({
  app,
  example
});

export default rootReducer;
