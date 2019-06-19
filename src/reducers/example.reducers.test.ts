import example, { initialState as exampleModel } from "./example.reducers";

import * as actions from "../actions/root.actions";

describe("[reducers] Example", () => {
  it("actions.setLocalData is handled", () => {
    const testValue = {
      inputValue: "Test"
    };

    const state = example(exampleModel, actions.setLocalData(testValue));

    expect(state.localData).toEqual(testValue);
  });

  describe("actions.fetchApiData", () => {
    it("done is handled", () => {
      const testValue = {
        apiValue: "Test"
      };

      const state = example(
        exampleModel,
        actions.fetchApiData.done({ params: undefined, result: testValue })
      );

      expect(state.apiData).toEqual(testValue);
    });
  });
});
