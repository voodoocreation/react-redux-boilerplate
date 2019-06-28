import ComponentTester from "../../../utilities/ComponentTester";

import ErrorRoute from "./ErrorRoute";

const component = new ComponentTester(ErrorRoute, true);

describe("[routes] <ErrorRoute />", () => {
  it("renders correctly", () => {
    const { wrapper } = component.mount();

    expect(wrapper.render()).toMatchSnapshot();
  });

  describe("getInitialProps()", () => {
    it("gets status code from HTTP response", async () => {
      const props = await ErrorRoute.getInitialProps({
        res: { statusCode: 404 }
      } as any);

      expect(props.statusCode).toBe(404);
    });

    it("gets status code and error message from context", async () => {
      const props = await ErrorRoute.getInitialProps({
        err: {
          message: "Error",
          statusCode: 500
        }
      } as any);

      expect(props.message).toBe("Error");
      expect(props.statusCode).toBe(500);
    });

    it("fails silently when status code isn't defined", async () => {
      const props = await ErrorRoute.getInitialProps({
        err: {
          message: "Error"
        }
      } as any);

      expect(props.message).toBe("Error");
      expect(props.statusCode).toBe(undefined);
    });
  });
});
