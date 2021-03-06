import messages from "../../../locales/en-NZ";
import WrapperWithIntl from "../../../utilities/WrapperWithIntl";
import ErrorPage from "./ErrorPage";

const component = new WrapperWithIntl(ErrorPage);

describe("[presentation] <ErrorPage />", () => {
  describe("when rendering with no props", () => {
    const wrapper = component.render();

    it("renders 500 title", () => {
      expect(wrapper.find("h1").html()).toBe(messages.ERROR_TITLE);
    });

    it("renders 500 message", () => {
      expect(wrapper.find("p").html()).toBe(messages.ERROR_MESSAGE);
    });
  });

  describe("when rendering with 404 status", () => {
    const wrapper = component.withProps({ status: 404 }).render();

    it("renders 404 title", () => {
      expect(wrapper.find("h1").html()).toBe(messages.ERROR_404_TITLE);
    });

    it("renders 404 message", () => {
      expect(wrapper.find("p").html()).toBe(messages.ERROR_404_MESSAGE);
    });
  });

  describe("when rendering with custom message", () => {
    const message = "Custom message";
    const wrapper = component.withProps({ message }).render();

    it("renders 500 title", () => {
      expect(wrapper.find("h1").html()).toBe(messages.ERROR_TITLE);
    });

    it("renders custom message", () => {
      expect(wrapper.find("p").html()).toBe(message);
    });
  });
});
