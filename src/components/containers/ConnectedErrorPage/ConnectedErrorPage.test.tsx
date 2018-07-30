import { render } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";

import createStore from "../../../store/root.store";
import ConnectedErrorPage from "./ConnectedErrorPage";

const setup = (fn: any) => {
  const store = createStore({
    page: {
      error: {
        message: "Not found",
        status: 404
      }
    }
  });

  return {
    actual: fn(
      <Provider store={store}>
        <ConnectedErrorPage />
      </Provider>
    ),
    store
  };
};

describe("[containers] <ConnectedErrorPage />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });
});
