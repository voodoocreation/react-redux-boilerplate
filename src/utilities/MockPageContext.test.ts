import MockPageContext from "./MockPageContext";

describe("[utilities] Mock page context", () => {
  const defaultError = { message: "Default error", statusCode: 500 };
  const defaultQuery = { test: "Default" };
  const defaultReduxState = { app: { isLoading: true } };
  const defaultResponse = { statusCode: 500 };

  const context = new MockPageContext()
    .withDefaultError(defaultError)
    .withDefaultQuery(defaultQuery)
    .withDefaultReduxState(defaultReduxState)
    .withDefaultResponse(defaultResponse);

  describe("default value definitions", () => {
    let ctx: any;

    it("converts context to object", () => {
      ctx = context.toObject();
    });

    it("defines the error correctly", () => {
      expect(ctx.err).toEqual(defaultError);
    });

    it("defines the query correctly", () => {
      expect(ctx.query).toEqual(defaultQuery);
    });

    it("defines the Redux state correctly", () => {
      expect(context.storeState.app.isLoading).toBe(
        defaultReduxState.app.isLoading
      );
    });

    it("defines the response correctly", () => {
      expect(ctx.res).toEqual(defaultResponse);
    });
  });

  describe("test-specific value definitions", () => {
    let ctx: any;

    const testError = { message: "Test error", statusCode: 404 };
    const testQuery = { test: "Test" };
    const testReduxState = { app: { isLoading: false } };
    const testResponse = { statusCode: 404 };

    it("converts context to object", () => {
      ctx = context
        .withError(testError)
        .withQuery(testQuery)
        .withReduxState(testReduxState)
        .withResponse(testResponse)
        .toObject();
    });

    it("defines the error correctly", () => {
      expect(ctx.err).toEqual(testError);
    });

    it("defines the query correctly", () => {
      expect(ctx.query).toEqual(testQuery);
    });

    it("defines the Redux state correctly", () => {
      expect(context.storeState.app.isLoading).toBe(
        testReduxState.app.isLoading
      );
    });

    it("defines the response correctly", () => {
      expect(ctx.res).toEqual(testResponse);
    });
  });

  describe("resetting back to default value definitions", () => {
    let ctx: any;

    it("converts context to object", () => {
      ctx = context.toObject();
    });

    it("defines the error correctly", () => {
      expect(ctx.err).toEqual(defaultError);
    });

    it("defines the query correctly", () => {
      expect(ctx.query).toEqual(defaultQuery);
    });

    it("defines the Redux state correctly", () => {
      expect(context.storeState.app.isLoading).toBe(
        defaultReduxState.app.isLoading
      );
    });

    it("defines the response correctly", () => {
      expect(ctx.res).toEqual(defaultResponse);
    });
  });

  describe("Redux history", () => {
    it("dispatches an action", () => {
      context.toObject().store.dispatch({ type: "ANY" });
    });

    it("adds the action to the Redux history", () => {
      expect(context.reduxHistory).toEqual([{ type: "ANY" }]);
    });
  });
});
