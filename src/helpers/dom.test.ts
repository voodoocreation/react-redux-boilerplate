import * as dom from "./dom";

const g: any = global;
const sWidth = 1920;
const sHeight = 1080;
const html = document.documentElement;

describe("[helpers] DOM", () => {
  describe("isInViewport()", () => {
    const inside: any = {
      bottomLeft: g.mockElement(200, 200, sHeight - 200),
      bottomRight: g.mockElement(200, 200, sHeight - 200, sWidth - 200),
      topLeft: g.mockElement(200, 200),
      topRight: g.mockElement(200, 200, 0, sWidth - 200)
    };
    const outside: any = {
      bottomLeft: g.mockElement(200, 200, sHeight - 199),
      bottomRight: g.mockElement(200, 200, sHeight - 199, sWidth - 199),
      topLeft: g.mockElement(200, 200, -1, -1),
      topRight: g.mockElement(200, 200, -1, sWidth - 199)
    };

    it("returns false when an element isn't provided", () => {
      expect(dom.isInViewport()).toBe(false);
    });

    describe("on a browser that supports window.innerWidth and window.innerHeight", () => {
      beforeEach(() => {
        g.innerWidth = sWidth;
        g.innerHeight = sHeight;
      });

      it("returns true when entire element is within the viewport", () => {
        expect(dom.isInViewport(inside.topLeft)).toBe(true);
        expect(dom.isInViewport(inside.topRight)).toBe(true);
        expect(dom.isInViewport(inside.bottomRight)).toBe(true);
        expect(dom.isInViewport(inside.bottomLeft)).toBe(true);
      });

      it("returns false when entire element is outside of the viewport", () => {
        expect(dom.isInViewport(outside.topLeft)).toBe(false);
        expect(dom.isInViewport(outside.topRight)).toBe(false);
        expect(dom.isInViewport(outside.bottomRight)).toBe(false);
        expect(dom.isInViewport(outside.bottomLeft)).toBe(false);
      });
    });

    describe("on a browser that doesn't support window.innerWidth and window.innerHeight", () => {
      beforeEach(() => {
        g.innerWidth = undefined;
        g.innerHeight = undefined;

        Object.defineProperty(html, "clientWidth", {
          value: sWidth,
          writable: false
        });
        Object.defineProperty(html, "clientHeight", {
          value: sHeight,
          writable: false
        });
      });

      it("returns true when entire element is within the viewport", () => {
        expect(dom.isInViewport(inside.topLeft)).toBe(true);
        expect(dom.isInViewport(inside.topRight)).toBe(true);
        expect(dom.isInViewport(inside.bottomRight)).toBe(true);
        expect(dom.isInViewport(inside.bottomLeft)).toBe(true);
      });

      it("returns false when entire element is outside of the viewport", () => {
        expect(dom.isInViewport(outside.topLeft)).toBe(false);
        expect(dom.isInViewport(outside.topRight)).toBe(false);
        expect(dom.isInViewport(outside.bottomRight)).toBe(false);
        expect(dom.isInViewport(outside.bottomLeft)).toBe(false);
      });
    });
  });

  describe("isAlmostInViewport()", () => {
    const inside: any = {
      bottomLeft: g.mockElement(200, 200, sHeight + 199, -399),
      bottomRight: g.mockElement(200, 200, sHeight + 199, sWidth + 199),
      topLeft: g.mockElement(200, 200, -399, -399),
      topRight: g.mockElement(200, 200, -399, sWidth + 199)
    };
    const outside: any = {
      bottomLeft: g.mockElement(200, 200, sHeight + 200, -400),
      bottomRight: g.mockElement(200, 200, sHeight + 200, sWidth + 200),
      topLeft: g.mockElement(200, 200, -400, -400),
      topRight: g.mockElement(200, 200, -400, sWidth + 200)
    };

    it("returns false when an element isn't provided", () => {
      expect(dom.isAlmostInViewport()).toBe(false);
    });

    describe("on a browser that supports window.innerWidth and window.innerHeight", () => {
      beforeEach(() => {
        g.innerWidth = sWidth;
        g.innerHeight = sHeight;
      });

      it("returns true when element is within an area 200px bigger than the viewport", () => {
        expect(dom.isAlmostInViewport(inside.topLeft, 200)).toBe(true);
        expect(dom.isAlmostInViewport(inside.topRight, 200)).toBe(true);
        expect(dom.isAlmostInViewport(inside.bottomRight, 200)).toBe(true);
        expect(dom.isAlmostInViewport(inside.bottomLeft, 200)).toBe(true);
      });

      it("returns false when element is outside of an area 200px bigger than the viewport", () => {
        expect(dom.isAlmostInViewport(outside.topLeft, 200)).toBe(false);
        expect(dom.isAlmostInViewport(outside.topRight, 200)).toBe(false);
        expect(dom.isAlmostInViewport(outside.bottomRight, 200)).toBe(false);
        expect(dom.isAlmostInViewport(outside.bottomLeft, 200)).toBe(false);
      });
    });

    describe("on a browser that doesn't support window.innerWidth and window.innerHeight", () => {
      beforeEach(() => {
        g.innerWidth = undefined;
        g.innerHeight = undefined;

        Object.defineProperty(html, "clientWidth", {
          value: sWidth,
          writable: false
        });
        Object.defineProperty(html, "clientHeight", {
          value: sHeight,
          writable: false
        });
      });

      it("returns true when element is within an area 200px bigger than the viewport", () => {
        expect(dom.isAlmostInViewport(inside.topLeft, 200)).toBe(true);
        expect(dom.isAlmostInViewport(inside.topRight, 200)).toBe(true);
        expect(dom.isAlmostInViewport(inside.bottomRight, 200)).toBe(true);
        expect(dom.isAlmostInViewport(inside.bottomLeft, 200)).toBe(true);
      });

      it("returns false when element is outside of an area 200px bigger than the viewport", () => {
        expect(dom.isAlmostInViewport(outside.topLeft, 200)).toBe(false);
        expect(dom.isAlmostInViewport(outside.topRight, 200)).toBe(false);
        expect(dom.isAlmostInViewport(outside.bottomRight, 200)).toBe(false);
        expect(dom.isAlmostInViewport(outside.bottomLeft, 200)).toBe(false);
      });
    });
  });
});
