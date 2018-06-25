import { render } from "enzyme";
import * as React from "react";

import IndexRoute from "./IndexRoute";

jest.mock("react-redux", () => ({
  connect: () => (component: any) => component
}));

const setup = (fn: any, fromTestProps?: any) => {
  const props = {
    ...fromTestProps
  };

  return {
    actual: fn(<IndexRoute {...props} />),
    props
  };
};

describe("<IndexRoute />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });

  it("renders correctly with data", () => {
    const { actual } = setup(render, {
      apiData: {
        test: "Test"
      },
      localData: {
        inputValue: "Test"
      }
    });
    expect(actual).toMatchSnapshot();
  });
});
