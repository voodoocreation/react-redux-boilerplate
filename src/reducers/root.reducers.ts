import { combineReducers } from "redux";

import example from "./example.reducers";
import page from "./page.reducers";

export default combineReducers({
  example,
  page
});
