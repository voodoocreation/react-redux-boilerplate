import { render } from "enzyme";
import * as React from "react";

import ErrorRoute from "./ErrorRoute";

const setup = (fn: any) => {
  const props = {};

  return {
    actual: fn(<ErrorRoute {...props} />),
    props
  };
};

describe("<ErrorRoute />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });
});
