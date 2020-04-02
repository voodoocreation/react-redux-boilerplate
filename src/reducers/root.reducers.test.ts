import rootReducer, { initialState } from "./root.reducers";

describe("[reducers] Root", () => {
  it("combines all reducers correctly", () => {
    const state = rootReducer({} as any, {
      type: "NOTHING",
    });

    expect(state).toEqual(initialState);
  });
});
