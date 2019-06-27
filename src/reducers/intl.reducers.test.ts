import reducer, { initialState } from "./intl.reducers";

import * as actions from "../actions/root.actions";

describe("[reducers] Intl", () => {
  it("reduces actions.appInit.started correctly when the locale is defined", () => {
    const state = reducer(
      initialState,
      actions.initApp.started({ locale: "en-US" })
    );

    expect(state.locale).toEqual("en-US");
  });

  it("reduces actions.appInit.started correctly when the locale isn't defined", () => {
    const state = reducer(initialState, actions.initApp.started({}));

    expect(state.locale).toEqual("en-NZ");
  });
});
