import example, { initialState as exampleModel } from "./example.reducers";

import * as actions from "../actions/root.actions";

describe("[Reducers] Example", () => {
  it("actions.setLocalData", () => {
    const testValue = {
      inputValue: "Test"
    };

    const state = example(exampleModel, actions.setLocalData(testValue));

    expect(state.localData).toEqual(testValue);
  });

  it("actions.fetchApiData.done", () => {
    const testValue = {
      apiValue: "Test"
    };

    const state = example(
      exampleModel,
      actions.fetchApiData.done({ params: {}, result: testValue })
    );

    expect(state.apiData).toEqual(testValue);
  });
});
