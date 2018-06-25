import { render } from "enzyme";
import * as React from "react";

import ErrorPage from "./ErrorPage";

const setup = (fn: any, fromTestProps?: any) => {
  const props = {
    ...fromTestProps
  };

  return {
    actual: fn(<ErrorPage {...props} />),
    props
  };
};

describe("<ErrorPage />", () => {
  it("renders 500 correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });

  it("renders 404 correctly", () => {
    const { actual } = setup(render, {
      message: "Not found",
      status: 404
    });
    expect(actual).toMatchSnapshot();
  });
});
