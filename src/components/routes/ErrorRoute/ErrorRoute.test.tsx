import { render } from "enzyme";
import * as React from "react";

import ErrorRoute from "./ErrorRoute";

const setup = (fn: any, fromTestProps = {}) => {
  const props = { ...fromTestProps };

  return {
    actual: fn(<ErrorRoute {...props} />),
    props
  };
};

describe("[routes] <ErrorRoute />", () => {
  it("renders correctly", () => {
    const { actual } = setup(render);

    expect(actual).toMatchSnapshot();
  });

  it("renders correctly with custom error message", () => {
    const { actual } = setup(render, { message: "Test" });

    expect(actual).toMatchSnapshot();
  });

  describe("getInitialProps()", () => {
    it("gets status code from HTTP response", async () => {
      const props = await ErrorRoute.getInitialProps({
        ctx: {
          res: { statusCode: 404 }
        }
      });

      expect(props.statusCode).toBe(404);
    });

    it("gets status code and error message from context", async () => {
      const props = await ErrorRoute.getInitialProps({
        ctx: {
          err: {
            message: "Error",
            statusCode: 500
          }
        }
      });

      expect(props.message).toBe("Error");
      expect(props.statusCode).toBe(500);
    });

    it("fails silently when status code isn't defined", async () => {
      const props = await ErrorRoute.getInitialProps({
        ctx: {
          err: {
            message: "Error"
          }
        }
      });

      expect(props.message).toBe("Error");
      expect(props.statusCode).toBe(undefined);
    });
  });
});
