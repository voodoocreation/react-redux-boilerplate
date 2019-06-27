import reducer, { initialState } from "./app.reducers";

import * as actions from "../actions/root.actions";

describe("[reducers] App", () => {
  it("reduces actions.setCurrentRoute correctly", () => {
    const route = "/";
    const state = reducer(initialState, actions.setCurrentRoute(route));

    expect(state.currentRoute).toEqual(route);
  });

  describe("actions.changeRoute", () => {
    it("reduces .started correctly", () => {
      const route = "/";
      const state = reducer(initialState, actions.changeRoute.started(route));

      expect(state.isLoading).toBe(true);
      expect(state.transitioningTo).toEqual(route);
    });

    it("reduces .done correctly", () => {
      const params = "/";
      const state = reducer(
        initialState,
        actions.changeRoute.done({ params, result: {} })
      );

      expect(state.isLoading).toBe(false);
      expect(state.transitioningTo).toBeUndefined();
    });

    it("reduces .failed correctly", () => {
      const params = "/";
      const error = { message: "Error", status: 500 };

      const state = reducer(
        initialState,
        actions.changeRoute.failed({ error, params })
      );

      expect(state.error).toEqual(error);
      expect(state.isLoading).toBe(false);
      expect(state.transitioningTo).toBeUndefined();
    });
  });
});
