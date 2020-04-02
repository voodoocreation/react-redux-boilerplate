import { intlReducer, IntlState } from "react-intl-redux";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "../actions/root.actions";
import enNZ from "../locales/en-NZ";

export const initialState: IntlState = {
  locale: "en-NZ",
  messages: enNZ,
};

export default reducerWithInitialState(initialState)
  .case(actions.initApp.started, (state, payload) => ({
    ...state,
    locale: payload.locale ? payload.locale : state.locale,
  }))

  .default(intlReducer);
