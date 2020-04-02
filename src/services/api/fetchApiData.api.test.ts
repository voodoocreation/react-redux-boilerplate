import { mockWithRejectedPromise, mockWithResolvedPromise } from "jest-mocks";

import { API } from "../../constants/url.constants";
import { failure, success } from "../../models/response.models";
import { fetchApiData } from "./fetchApiData.api";

describe("[api] fetchApiData", () => {
  describe("when the API call succeeds", () => {
    const data = {
      serverTest: true,
    };
    const request = mockWithResolvedPromise(data);
    const method = fetchApiData(request);

    it("returns a success response with the expected data", async () => {
      expect(await method()).toEqual(success(data));
    });

    it("makes the request with the expected payload", () => {
      expect(request).toHaveBeenCalledWith(API.EXAMPLE);
    });
  });

  describe("when the API call fails", () => {
    const request = mockWithRejectedPromise("Fetch failed");
    const method = fetchApiData(request);

    it("returns a failure response with the expected error", async () => {
      expect(await method()).toEqual(failure("Fetch failed"));
    });

    it("makes the request with the expected payload", () => {
      expect(request).toHaveBeenCalledWith(API.EXAMPLE);
    });
  });
});
