import * as apiMethods from "./api/root.api";
import { configureMockApi } from "./configureApi";

describe("[services] API", () => {
  describe("when creating the mock API instance", () => {
    const api = configureMockApi();

    it("has all API methods in the resulting object", () => {
      expect(Object.keys(api)).toEqual(Object.keys(apiMethods));
    });

    it("binds the methods as Jest mock functions correctly", async () => {
      const promises = [];
      for (const method of Object.values(api)) {
        promises.push(method());
        expect(method).toHaveBeenCalledTimes(1);
      }

      const responses = await Promise.all(promises);

      for (const response of responses) {
        expect(response).toHaveProperty("message");
        expect(response).toHaveProperty("ok");
      }
    });
  });
});
