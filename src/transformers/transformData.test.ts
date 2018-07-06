import * as data from "./transformData";

describe("[transformers] Data", () => {
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

  describe("assocToArray()", () => {
    it("transforms correctly for a valid object", () => {
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
});
