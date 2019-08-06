import ComponentTester from "../../../utilities/ComponentTester";
import MockPageContext from "../../../utilities/MockPageContext";
import ErrorRoute from "./ErrorRoute";

const component = new ComponentTester(ErrorRoute, true);

describe("[routes] <ErrorRoute />", () => {
  it("matches snapshot", () => {
    const { wrapper } = component.mount();

    expect(wrapper.render()).toMatchSnapshot();
  });

  describe("getInitialProps", () => {
    const context = new MockPageContext();

    it("gets status code from HTTP response", async () => {
      const props = await ErrorRoute.getInitialProps(
        context.withResponse({ statusCode: 404 }).toObject()
      );

      expect(props.statusCode).toBe(404);
    });

    it("gets status code and error message from context", async () => {
      const props = await ErrorRoute.getInitialProps(
        context
          .withError({
            message: "Error",
            statusCode: 500
          })
          .toObject()
      );

      expect(props.message).toBe("Error");
      expect(props.statusCode).toBe(500);
    });

    it("fails silently when status code isn't defined", async () => {
      const props = await ErrorRoute.getInitialProps(
        context
          .withError({
            message: "Error"
          })
          .toObject()
      );

      expect(props.message).toBe("Error");
      expect(props.statusCode).toBe(undefined);
    });

    it("defaults to 404 when no response or error is defined", async () => {
      const props = await ErrorRoute.getInitialProps(context.toObject());

      expect(props.statusCode).toBe(404);
    });
  });
});
