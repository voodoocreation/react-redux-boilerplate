import { failure, success } from "../../models/response.models";
import {
  mockWithRejectedPromise,
  mockWithResolvedPromise
} from "../../utilities/mocks";
import { fetchApiData } from "./fetchApiData.api";

describe("[api] fetchApiData", () => {
  describe("when the API call succeeds", () => {
    const data = {
      serverTest: true
    };
    const method = fetchApiData(mockWithResolvedPromise(data));

    it("returns a success response with the expected data", async () => {
      expect(await method()).toEqual(success(data));
    });
  });

  describe("when the API call fails", () => {
    const method = fetchApiData(mockWithRejectedPromise("Fetch failed"));

    it("returns a failure response with the expected error", async () => {
      expect(await method()).toEqual(failure("Fetch failed"));
    });
  });
});
