import WrapperWithIntl from "../../../utilities/WrapperWithIntl";
import Link from "./Link";

const component = new WrapperWithIntl(Link)
  .withDefaultProps({
    router: {
      components: {
        test: ""
      }
    }
  } as any)
  .withDefaultChildren("Link text");

describe("[presentation] <Link />", () => {
  describe("when the router is available and route is defined", () => {
    const wrapper = component.withProps({ route: "/" }).mount();

    it("renders with LinkRoutes", () => {
      expect(wrapper.find("LinkRoutes")).toHaveLength(1);
    });

    it("renders with Next.js Link", () => {
      expect(wrapper.find("Link")).toHaveLength(2);
    });

    it("renders an <a>", () => {
      expect(wrapper.find("a")).toHaveLength(1);
    });

    it("matches snapshot", () => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe("when the router is available and href is defined", () => {
    const wrapper = component.withProps({ href: "/" }).mount();

    it("doesn't render with LinkRoutes", () => {
      expect(wrapper.find("LinkRoutes")).toHaveLength(0);
    });

    it("renders with Next.js Link", () => {
      expect(wrapper.find("Link")).toHaveLength(2);
    });

    it("renders an <a>", () => {
      expect(wrapper.find("a")).toHaveLength(1);
    });

    it("matches snapshot", () => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe("when the router is unavailable and href is defined", () => {
    const wrapper = component
      .withProps({
        href: "/",
        router: null
      } as any)
      .mount();

    it("doesn't render with LinkRoutes", () => {
      expect(wrapper.find("LinkRoutes")).toHaveLength(0);
    });

    it("doesn't render with Next.js Link", () => {
      expect(wrapper.find("Link")).toHaveLength(1);
    });

    it("renders an <a>", () => {
      expect(wrapper.find("a")).toHaveLength(1);
    });

    it("<a> href is the href value", () => {
      expect(wrapper.find("a").prop("href")).toBe("/");
    });

    it("matches snapshot", () => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe("when isExternal is true", () => {
    const wrapper = component
      .withProps({
        isExternal: true,
        route: "/",
        router: null
      } as any)
      .mount();

    it("external attributes are defined on the <a>", () => {
      expect(wrapper.find("a").props()).toMatchObject({
        rel: "noopener noreferrer",
        target: "_blank"
      });
    });

    it("matches snapshot", () => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe("when both href and route are undefined", () => {
    const wrapper = component
      .withProps({
        href: undefined,
        route: undefined
      })
      .mount();

    it("doesn't render an <a>", () => {
      expect(wrapper.find("a")).toHaveLength(0);
    });

    it("renders a <span>", () => {
      expect(wrapper.find("span")).toHaveLength(1);
    });

    it("matches snapshot", () => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
