import { render } from "enzyme";
import * as React from "react";

import ConnectedErrorPage from "./ConnectedErrorPage";

jest.mock("react-redux", () => ({
  connect: () => (component: any) => component
}));

const setup = (fn: any) => {
  const props = {
    error: {
      message: "Not found",
      status: 404
    }
  };

  return {
    actual: fn(<ConnectedErrorPage {...props} />),
    props
  };
};

describe("<ConnectedErrorPage />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(actual).toMatchSnapshot();
  });
});
