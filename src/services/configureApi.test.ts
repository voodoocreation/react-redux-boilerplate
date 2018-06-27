import mockAxios from "jest-mock-axios";

import { createApiWith, createPortsWith } from "./configureApi";

describe("[services] API", () => {
  const internet = createPortsWith({});

  afterEach(() => {
    mockAxios.reset();
    mockAxios.mockClear();
  });

  it("creates API instance correctly", () => {
    const api = createApiWith(internet);

    expect(typeof api.fetchApiData).toBe("function");
  });

  it("makes API requests and transforms JSON keys correctly when successful", () => {
    const response: any = internet({ url: "/api/test" });

    mockAxios.mockResponse({
      data: { TestData: "test" },
      status: 200
    });

    expect(mockAxios).toHaveBeenCalled();
    expect(response.data).toEqual({ testData: "test" });
  });

  it("makes API requests and handles server error correctly", () => {
    let serverError;

    try {
      internet({ url: "/api/test" });

      mockAxios.mockError({
        response: {
          data: {
            message: "Server error"
          },
          status: 502
        }
      });
    } catch (error) {
      serverError = JSON.parse(error.message);
    }

    expect(mockAxios.mock.calls[0][0].url).toBe("/api/test");
    expect(serverError.message).toBe("Server error");
    expect(serverError.status).toBe(502);
  });

  it("makes API requests and handles request error correctly", () => {
    let requestError;

    try {
      internet({ url: "/api/test" });

      mockAxios.mockError({
        request: {
          statusText: "Request timed out"
        }
      });
    } catch (error) {
      requestError = error;
    }

    expect(mockAxios.mock.calls[0][0].url).toBe("/api/test");
    expect(requestError.message).toBe("Request timed out");
  });

  it("makes API requests and handles client error correctly", () => {
    let clientError;

    try {
      internet({ url: "/api/test" });

      mockAxios.mockError({
        message: "Request setup failed"
      });
    } catch (error) {
      clientError = error;
    }

    expect(mockAxios.mock.calls[0][0].url).toBe("/api/test");
    expect(clientError.message).toBe("Request setup failed");
  });
});
