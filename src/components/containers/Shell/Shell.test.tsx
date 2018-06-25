import { render } from "enzyme";
import * as React from "react";

import Shell from "./Shell";

const setup = (fn: any) => {
  const props = {};

  return {
    actual: fn(<Shell {...props} />),
    props
  };
};

describe("<Shell />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });
});
