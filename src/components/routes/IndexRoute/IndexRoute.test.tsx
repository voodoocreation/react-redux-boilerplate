import { mount, render } from "enzyme";
import merge from "lodash.merge";
import * as React from "react";
import { Provider } from "react-redux";

import createStore from "../../../store/root.store";
import IndexRoute from "./IndexRoute";

const setup = (fn: any, fromTestStore = {}, fromTestApi?: {}) => {
  const store = createStore(
    merge(
      {},
      fromTestStore
    ),
    {},
    fromTestApi
  );

  return {
    actual: fn(
      <Provider store={store}>
        <IndexRoute />
      </Provider>
    ),
    store
  };
};

describe("<IndexRoute />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });

  it("renders correctly with data", () => {
    const { actual } = setup(render, {
      example: {
        apiData: {
          test: "Test"
        },
        localData: {
          inputValue: "Test"
        }
      }
    });
    expect(actual).toMatchSnapshot();
  });

  it("handles input change event correctly", () => {
    const { actual, store } = setup(mount);
    const value = "Test value";
    const input = actual.find("input");

    input.getDOMNode().value = value;
    input.simulate("change");

    expect(store.getState().example.localData.inputValue).toBe(value);
  });

  it("handles API data button click event correctly", () => {
    const data = { apiValue: "Test" };
    const { actual, store } = setup(mount, {}, {
      fetchApiData: () => ({ ok: true, data })
    });

    actual.find("button").simulate("click");

    expect(store.getState().example.apiData).toEqual(data);
  });
});
