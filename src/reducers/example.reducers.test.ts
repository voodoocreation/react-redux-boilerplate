import * as actions from "../actions/root.actions";
import reducer, { initialState } from "./example.reducers";

describe("[reducers] Example", () => {
  it("actions.setLocalData is handled", () => {
    const testValue = {
      inputValue: "Test"
    };

    const state = reducer(initialState, actions.setLocalData(testValue));

    expect(state.localData).toEqual(testValue);
  });

  describe("actions.fetchApiData", () => {
    it("done is handled", () => {
      const testValue = {
        apiValue: "Test"
      };

      const state = reducer(
        initialState,
        actions.fetchApiData.done({ params: {}, result: testValue })
      );

      expect(state.apiData).toEqual(testValue);
    });
  });
});
