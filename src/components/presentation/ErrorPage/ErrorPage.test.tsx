import en from "../../../locales/en-NZ.json";
import ComponentTester from "../../../utilities/ComponentTester";

import ErrorPage from "./ErrorPage";

const component = new ComponentTester(ErrorPage);

describe("[presentation] <ErrorPage />", () => {
  describe("when rendering with no props", () => {
    const { wrapper } = component.render();

    it("renders 500 title", () => {
      expect(wrapper.find("h1").html()).toBe(en.ERROR_TITLE);
    });

    it("renders 500 message", () => {
      expect(wrapper.find("p").html()).toBe(en.ERROR_MESSAGE);
    });
  });

  describe("when rendering with 404 status", () => {
    const { wrapper } = component.withProps({ status: 404 }).render();

    it("renders 404 title", () => {
      expect(wrapper.find("h1").html()).toBe(en.ERROR_404_TITLE);
    });

    it("renders 404 message", () => {
      expect(wrapper.find("p").html()).toBe(en.ERROR_404_MESSAGE);
    });
  });

  describe("when rendering with custom message", () => {
    const message = "Custom message";
    const { wrapper } = component.withProps({ message }).render();

    it("renders 500 title", () => {
      expect(wrapper.find("h1").html()).toBe(en.ERROR_TITLE);
    });

    it("renders custom message", () => {
      expect(wrapper.find("p").html()).toBe(message);
    });
  });
});
