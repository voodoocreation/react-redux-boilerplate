import { camelizeKeys } from "humps";
import { mockWithRejectedPromise, mockWithResolvedPromise } from "jest-mocks";

import { configureHttpClient, IRequestOptions } from "./configureHttpClient";

describe("[services] HTTP client", () => {
  let response: any;

  const createFetch = (ok: boolean, status: number, body?: any) =>
    mockWithResolvedPromise({
      ok,
      status,
      text: () => JSON.stringify(body)
    }) as any;

  const url = "http://api.test.com/test-endpoint";
  const mockResponse = {
    NumberResponse: 1,
    StringResponse: "Test"
  };

  describe("when making a request with all options defined, regardless of the response", () => {
    const fetch = createFetch(true, 200);
    const request = configureHttpClient({ fetch });

    beforeAll(() => {
      jest.clearAllMocks();
    });

    const requestOptions = {
      body: {
        numberParam: 1,
        stringParam: "Test"
      },
      headers: {
        "X-Test-Header": "test"
      },
      method: "POST",
      params: {
        test: "test"
      }
    };

    it("makes the request", async () => {
      response = await request(url, requestOptions as IRequestOptions);
    });

    it("makes the fetch request correctly with all provided options defined", () => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${url}?test=${requestOptions.params.test}`,
        {
          body: JSON.stringify(requestOptions.body),
          headers: {
            "Content-Type": "application/json",
            ...requestOptions.headers
          },
          method: requestOptions.method
        }
      );
    });
  });

  describe("when making a request with no options defined, regardless of the response", () => {
    const fetch = createFetch(true, 200);
    const request = configureHttpClient({ fetch });

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("makes the request", async () => {
      response = await request(url);
    });

    it("makes the fetch request correctly with all default options defined", () => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(url, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      });
    });
  });

  describe("when making a request, with a successful reponse", () => {
    const fetch = createFetch(true, 200, mockResponse);
    const request = configureHttpClient({ fetch });

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("makes the request", async () => {
      response = await request(url);
    });

    it("returns the JSON-parsed response data", () => {
      expect(response).toEqual(camelizeKeys(mockResponse));
    });
  });

  describe("when making a request when the response isn't a 200 status code, but contains JSON data", () => {
    const fetch = createFetch(false, 500, mockResponse);
    const request = configureHttpClient({ fetch });

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("throws an error that includes the JSON-parsed response data", async () => {
      let thrownError: any;

      try {
        await request(url);
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe("Request failed with status code 500.");
      expect(thrownError.data).toEqual(camelizeKeys(mockResponse));
    });
  });

  describe("when making a request when the response isn't a 200 status code, but contains text data", () => {
    const fetch = createFetch(false, 500, "Text message");
    const request = configureHttpClient({ fetch });

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("throws an error that includes the text message data", async () => {
      let thrownError: any;

      try {
        await request(url);
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe("Request failed with status code 500.");
      expect(thrownError.data).toBe("Text message");
    });
  });

  describe("when making a request, when the request fails before sending", () => {
    const request = configureHttpClient({
      fetch: mockWithRejectedPromise("Bad request") as any
    });

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it("throws an error with the expected message", async () => {
      let thrownError;

      try {
        await request(url);
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError).toEqual(new Error("Bad request"));
    });
  });
});
