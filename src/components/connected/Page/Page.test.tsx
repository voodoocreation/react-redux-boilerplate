import ComponentTester from "../../../utilities/ComponentTester";

import Page from "./Page";

const component = new ComponentTester(Page, true)
  .withDefaultProps({
    className: "TestClassName"
  })
  .withDefaultReduxState({
    app: { isLoading: false }
  })
  .withDefaultChildren("Page");

describe("[connected] <Page />", () => {
  describe("when the app isn't loading", () => {
    const { actual } = component.mount();

    it("doesn't render with isLoading class", () => {
      expect(actual.hasClass("isLoading")).toBe(false);
    });

    it("renders children", () => {
      expect(actual.find(".Page--body").text()).toBe("Page");
    });
  });

  describe("when the app is loading", () => {
    const { actual } = component
      .withReduxState({
        app: { isLoading: true }
      })
      .mount();

    it("renders with isLoading class", () => {
      expect(actual.render().hasClass("isLoading")).toBe(true);
    });

    it("doesn't render children", () => {
      expect(actual.find(".Page--body").text()).toBe("");
    });
  });
});
