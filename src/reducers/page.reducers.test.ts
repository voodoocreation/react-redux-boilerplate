import page, { initialState as pageModel } from "./page.reducers";

import * as actions from "../actions/root.actions";

describe("[Reducers] Page", () => {
  it("actions.changeRoute.started", () => {
    const testValue = "/";

    const state = page(pageModel, actions.changeRoute.started(testValue));

    expect(state.isLoading).toBe(true);
    expect(state.transitioningTo).toEqual(testValue);
  });

  it("actions.changeRoute.done", () => {
    const testValue = "/";

    const state = page(
      pageModel,
      actions.changeRoute.done({ params: testValue })
    );

    expect(state.isLoading).toBe(false);
    expect(state.transitioningTo).toBeUndefined();
  });

  it("actions.changeRoute.failed", () => {
    const error = { message: "Error", status: 500 };
    const testValue = "/";

    const state = page(
      pageModel,
      actions.changeRoute.failed({
        error,
        params: testValue
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(error);
    expect(state.transitioningTo).toBeUndefined();
  });
});
