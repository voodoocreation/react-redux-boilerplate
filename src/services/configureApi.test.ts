import { mockWithRejectedPromise } from "../utilities/mocks";
import * as apiMethods from "./api/root.api";
import { configureApi, configureMockApi } from "./configureApi";
import { TRequest } from "./configureHttpClient";

describe("[services] API", () => {
  const httpClient: TRequest = mockWithRejectedPromise("Failed");

  describe("when creating the API instance", () => {
    const api = configureApi(httpClient);

    it("has all API methods in the resulting object", () => {
      expect(Object.keys(api)).toEqual(Object.keys(apiMethods));
    });

    it("binds the methods correctly", async () => {
      for (const method of Object.values(api) as any) {
        const response = await method();

        expect(response).toHaveProperty("message");
        expect(response).toHaveProperty("ok");
      }
    });
  });

  describe("when creating the mock API instance", () => {
    const api = configureMockApi();

    it("has all API methods in the resulting object", () => {
      expect(Object.keys(api)).toEqual(Object.keys(apiMethods));
    });

    it("binds the methods as Jest mock functions correctly", async () => {
      for (const method of Object.values(api)) {
        const response = await method();

        expect(method).toHaveBeenCalledTimes(1);
        expect(response).toHaveProperty("message");
        expect(response).toHaveProperty("ok");
      }
    });
  });
});
