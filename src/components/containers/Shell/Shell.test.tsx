import { render } from "enzyme";
import merge from "lodash.merge";
import * as React from "react";
import { Provider } from "react-redux";

import createStore from "../../../store/root.store";
import Shell from "./Shell";

const setup = (fn: any, fromTestProps?: any, fromTestStore?: any) => {
  const props = {
    className: "TestClassName",
    ...fromTestProps
  };
  const store = createStore(
    merge({
      page: { isLoading: false },
      ...fromTestStore
    })
  );

  return {
    actual: fn(
      <Provider store={store}>
        <Shell {...props} />
      </Provider>
    ),
    props,
    store
  };
};

describe("[containers] <Shell />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });

  it("renders correctly when loading", () => {
    const { actual } = setup(
      render,
      {},
      {
        page: { isLoading: true }
      }
    );
    expect(actual).toMatchSnapshot();
  });
});
