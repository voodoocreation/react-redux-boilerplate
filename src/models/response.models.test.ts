import { ServerError } from "../services/configureHttpClient";
import { failure, success } from "./root.models";

describe("[models] Response", () => {
  describe("failure", () => {
    it("creates a valid object when a string was provided", () => {
      expect(failure("Error")).toEqual({
        message: "Error",
        ok: false,
      });
    });

    it("creates a valid object when a regular Error was provided", () => {
      expect(failure(new Error("Error"))).toEqual({
        message: "Error",
        ok: false,
      });
    });

    it("creates a valid object with data included when a ServerError was provided", () => {
      expect(
        failure(
          new ServerError("Error", { status: 500 } as any, { test: true })
        )
      ).toEqual({
        data: { test: true },
        message: "Error",
        ok: false,
      });
    });
  });

  describe("success", () => {
    it("creates a valid success object", () => {
      const data = {
        test: "Success",
      };

      expect(success(data)).toEqual({
        data,
        ok: true,
      });
    });
  });
});
