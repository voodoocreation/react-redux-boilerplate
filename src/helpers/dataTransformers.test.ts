import * as data from "./dataTransformers";

const nodeEnv = process.env.NODE_ENV;

describe("[helpers] Data transformers", () => {
  describe("arrayToAssoc()", () => {
    const valid = [{ id: "test-1" }, { id: "test-2" }, { id: "test-3" }];
    const invalid = [{ id: "test-1" }, { key: "test-2" }, { id: "test-3" }];

    it("transforms correctly for a valid array", () => {
      let isPassing = true;
      let transformed = {};

      try {
        transformed = data.arrayToAssoc(valid, "id");
      } catch (error) {
        isPassing = false;
      }

      expect(transformed).toEqual({
        "test-1": valid[0],
        "test-2": valid[1],
        "test-3": valid[2]
      });
      expect(isPassing).toBe(true);
    });

    it("excludes invalid items when set to fail silently", () => {
      let isPassing = true;
      let transformed = {};

      try {
        transformed = data.arrayToAssoc(invalid, "id");
      } catch (error) {
        isPassing = false;
      }

      expect(transformed).toEqual({
        "test-1": valid[0],
        "test-3": valid[2]
      });
      expect(isPassing).toBe(true);
    });

    it("throws an error for an invalid array", () => {
      let isPassing = true;
      let transformed = {};

      try {
        transformed = data.arrayToAssoc(invalid, "id", false);
      } catch (error) {
        isPassing = false;
      }

      expect(transformed).toEqual({});
      expect(isPassing).toBe(false);
    });
  });

  describe("createSlugFromString()", () => {
    it("creates a valid slug, stripping out invalid characters and replacing spaces with '-' and '&' with 'and'", () => {
      expect(data.createSlugFromString("André's Café & Bar")).toBe(
        "andres-cafe-and-bar"
      );
    });
  });

  describe("lengthToDuration()", () => {
    afterEach(() => {
      // @ts-ignore-next-line
      process.env.NODE_ENV = nodeEnv;
    });

    it("transforms correctly for a string with seconds", () => {
      expect(data.lengthToDuration("34")).toEqual("PT34S");
    });

    it("transforms correctly for a string with minutes and seconds", () => {
      expect(data.lengthToDuration("5:04")).toEqual("PT5M4S");
    });

    it("transforms correctly for a string with hours, minutes and seconds", () => {
      expect(data.lengthToDuration("06:05:04")).toEqual("PT6H5M4S");
    });

    it("throws an error for an invalid string", () => {
      let isPassing = true;

      try {
        data.lengthToDuration("34:52:32:50");
      } catch (error) {
        isPassing = false;
      }

      expect(isPassing).toBe(false);
    });
  });

  describe("absoluteUrl()", () => {
    describe("when NODE_ENV=development", () => {
      beforeEach(() => {
        // @ts-ignore-next-line
        process.env.NODE_ENV = "development";
        process.env.PORT = "5000";
      });

      it("prefixes with http://localhost:{process.env.PORT} when it's defined", () => {
        expect(data.absoluteUrl("/news/article-slug")).toEqual(
          "http://localhost:5000/news/article-slug"
        );
      });

      it("prefixes with http://localhost:{window.location.port} when process.env.PORT is undefined", () => {
        process.env.PORT = undefined;
        Object.defineProperty(window, "location", {
          value: {
            host: "localhost",
            port: "1234"
          }
        });

        expect(data.absoluteUrl("/news/article-slug")).toEqual(
          "http://localhost:1234/news/article-slug"
        );
      });
    });

    describe("when NODE_ENV=production", () => {
      beforeEach(() => {
        // @ts-ignore-next-line
        process.env.NODE_ENV = "production";
      });

      it("prefixes with http://{process.env.DOMAIN} when it's defined", () => {
        process.env.DOMAIN = "mynameisviii.com";

        expect(data.absoluteUrl("/news/article-slug")).toEqual(
          "https://mynameisviii.com/news/article-slug"
        );
      });

      it("prefixes with http://{window.location.host} when process.env.DOMAIN is undefined", () => {
        process.env.DOMAIN = undefined;

        expect(data.absoluteUrl("/news/article-slug")).toEqual(
          "https://localhost/news/article-slug"
        );
      });
    });
  });

  describe("extractDomain()", () => {
    it("extracts domain correctly", () => {
      expect(data.extractDomain("https://mynameisviii.com/news")).toEqual(
        "mynameisviii.com"
      );
    });
  });

  describe("toTitleCase()", () => {
    it("converts string to title case correctly", () => {
      expect(data.toTitleCase("title case string")).toBe("Title Case String");
    });

    it("converts string to title case correctly with custom delimiter", () => {
      expect(data.toTitleCase("title-case-slug", "-")).toBe("Title Case Slug");
    });
  });
});
