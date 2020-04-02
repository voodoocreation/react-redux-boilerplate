import axios from "axios";

import { configureHttpClient, ServerError } from "./configureHttpClient";

jest.mock("axios", () => ({
  __esModule: true,
  default: jest.fn((options: any) => {
    switch (options.url) {
      case "/success":
        return Promise.resolve({
          data: {
            IsSuccessful: true,
          },
        });

      case "/server-error":
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          response: {
            data: {
              IsSuccessful: false,
            },
            status: 500,
          },
        });

      case "/no-response":
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          request: {
            statusText: "No response",
          },
        });

      default:
      case "/client-error":
        throw new Error("Client error");
    }
  }),
}));

describe("[services] HTTP client", () => {
  const method = "POST";
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  const data = {
    query: "Test",
  };

  describe("when making a request, and the options and method are not provided", () => {
    const url = "/success";

    const request = configureHttpClient();

    it("makes the request", async () => {
      await request(url);
    });

    it("sends the request with the correct options", () => {
      expect(axios).toHaveBeenCalledWith({
        data: undefined,
        headers,
        method: "GET",
        url,
      });
    });
  });

  describe("when making a request, with a successful response", () => {
    let response: any;
    const url = "/success";

    const request = configureHttpClient();

    it("makes the request", async () => {
      response = await request(url, {
        data,
        method,
      });
    });

    it("sends the request with the correct options", () => {
      expect(axios).toHaveBeenCalledWith({
        data,
        headers,
        method,
        url,
      });
    });

    it("has the expected response", () => {
      expect(response).toEqual({
        isSuccessful: true,
      });
    });
  });

  describe("when making a request, with a failed response from the server", () => {
    let response: any;
    const url = "/server-error";

    const request = configureHttpClient();

    it("makes the request", async () => {
      try {
        response = await request(url, {
          data,
          method,
        });
      } catch (error) {
        response = error;
      }
    });

    it("sends the request with the correct options", () => {
      expect(axios).toHaveBeenCalledWith({
        data,
        headers,
        method,
        url,
      });
    });

    it("has the expected response", () => {
      const mockError = new ServerError(
        "Request failed with status code 500.",
        { status: 500 } as any,
        {
          isSuccessful: false,
        }
      );

      expect(response.data).toEqual(mockError.data);
      expect(response.message).toBe(mockError.message);
      expect(response.response).toMatchObject(mockError.response);
    });
  });

  describe("when making a request, with a no response from the server", () => {
    let response: any;
    const url = "/no-response";
    const request = configureHttpClient();

    it("makes the request", async () => {
      try {
        response = await request(url, {
          data,
          method,
        });
      } catch (error) {
        response = error.message;
      }
    });

    it("sends the request with the correct options", () => {
      expect(axios).toHaveBeenCalledWith({
        data,
        headers,
        method,
        url,
      });
    });

    it("has the expected response", () => {
      expect(response).toBe("No response");
    });
  });

  describe("when making a request, when the client fails before making the request", () => {
    let response: any;
    const url = "/client-error";

    const request = configureHttpClient();

    it("makes the request", async () => {
      try {
        response = await request(url, {
          data,
          method,
        });
      } catch (error) {
        response = error.message;
      }
    });

    it("sends the request with the correct options", () => {
      expect(axios).toHaveBeenCalledWith({
        data,
        headers,
        method,
        url,
      });
    });

    it("has the expected response", () => {
      expect(response).toBe("Client error");
    });
  });
});
