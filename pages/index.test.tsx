import { render } from "enzyme";
import toJson from "enzyme-to-json";
import * as React from "react";

import Index from "./index";

jest.mock("../src/helpers/withRedux");

const setup = (fn: any) => {
  const props = {
    apiData: {
      serverTest: "Test"
    },
    localData: {
      inputValue: "Test"
    }
  };

  return {
    actual: fn(<Index {...props} />),
    props
  };
};

describe("<Index />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);
    expect(toJson(actual)).toMatchSnapshot();
  });
});
