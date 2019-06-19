import * as data from "./data.transformers";

describe("[transformers] Data", () => {
  describe("arrayToAssoc()", () => {
    const valid = [{ id: "test-1" }, { id: "test-2" }, { id: "test-3" }];
    const invalid = [{ id: "test-1" }, { key: "test-2" }, { id: "test-3" }];

    it("transforms a valid array correctly", () => {
      expect(data.arrayToAssoc(valid, "id")).toEqual({
        "test-1": valid[0],
        "test-2": valid[1],
        "test-3": valid[2]
      });
    });

    it("doesn't throw an error and just excludes invalid items when set to fail silently", () => {
      expect(data.arrayToAssoc(invalid, "id")).toEqual({
        "test-1": valid[0],
        "test-3": valid[2]
      });
    });

    it("throws an error for an invalid array when set to not fail silently", () => {
      expect(() => {
        data.arrayToAssoc(invalid, "id", false);
      }).toThrowError("Key 'id' not found at index 1");
    });
  });

  describe("assocToArray()", () => {
    it("transforms a valid object correctly", () => {
      expect(
        data.assocToArray({
          "test-1": { id: "test-1" },
          "test-2": { id: "test-2" },
          "test-3": { id: "test-3" }
        })
      ).toEqual([{ id: "test-1" }, { id: "test-2" }, { id: "test-3" }]);
    });
  });

  describe("tryParseJson()", () => {
    const valid = `{"test-1": ["1","2","3"]}`;
    const invalid = `{"test-1": ["1","2","3"]}}`;
    const expected = { "test-1": ["1", "2", "3"] };

    it("parses a valid JSON string", () => {
      expect(data.tryParseJson(valid)).toEqual(expected);
    });

    it("parses an Error with valid JSON string as its message", () => {
      expect(data.tryParseJson(new Error(valid))).toEqual(expected);
    });

    it("parses an object with `toString` method", () => {
      expect(data.tryParseJson({ toString: () => valid })).toEqual(expected);
    });

    it("fails silently and returns the input for an invalid JSON string", () => {
      expect(data.tryParseJson(invalid)).toEqual(invalid);
    });
  });

  describe("createSlugFromString()", () => {
    it("creates a valid slug, stripping out invalid characters and replacing spaces with '-' and '&' with 'and'", () => {
      expect(data.createSlugFromString("André's Café & Bar")).toBe(
        "andres-cafe-and-bar"
      );
    });
  });

  describe("absoluteUrl()", () => {
    describe("when NODE_ENV=development", () => {
      beforeEach(() => {
        Object.defineProperty(window, "location", {
          value: { host: "localhost", port: "6000" }
        });
        process.env.NODE_ENV = "development";
      });

      it("prefixes with http://localhost:{process.env.PORT} when process.env.PORT is defined", () => {
        process.env.PORT = "5000";

        expect(data.absoluteUrl("/games/game-slug")).toEqual(
          "http://localhost:5000/games/game-slug"
        );
      });

      it("prefixes with http://localhost:{window.location.port} when process.env.PORT isn't defined", () => {
        process.env.PORT = undefined;

        expect(data.absoluteUrl("/games/game-slug")).toEqual(
          "http://localhost:6000/games/game-slug"
        );
      });
    });

    describe("when NODE_ENV=production", () => {
      beforeEach(() => {
        process.env.NODE_ENV = "production";
      });

      it("prefixes with http://example.com", () => {
        expect(data.absoluteUrl("/games/game-slug")).toEqual(
          "http://example.com/games/game-slug"
        );
      });
    });
  });
});
