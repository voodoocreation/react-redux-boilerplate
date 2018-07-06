import createMockHttpClient from "../helpers/createMockHttpClient";
import { tryParseJson } from "../transformers/transformData";
import { createApiWith, createPortsWith } from "./configureApi";

describe("[services] API", () => {
  it("creates API instance correctly", () => {
    const api = createApiWith(createPortsWith({}));

    expect(typeof api.fetchApiData).toBe("function");
  });

  it("makes API requests and transforms JSON keys correctly when successful", async () => {
    const client = createMockHttpClient(resolve => {
      resolve({
        data: { TestData: "test" },
        status: 200
      });
    });
    const request = createPortsWith({}, client);
    const response = await request({ url: "/api/test", method: "POST" });

    expect(client).toHaveBeenCalled();
    expect(client.mock.calls[0][0].method).toBe("POST");
    expect(client.mock.calls[0][0].url).toBe("/api/test");
    expect(response).toEqual({ testData: "test" });
  });

  it("makes API requests and handles server error correctly", async () => {
    const client = createMockHttpClient((_, reject) => {
      reject({
        response: {
          data: { message: "Server error" },
          status: 500
        }
      });
    });
    const request = createPortsWith({}, client);
    let serverError;

    try {
      await request({ url: "/api/test" });
    } catch (error) {
      serverError = tryParseJson(error);
    }

    expect(client).toHaveBeenCalled();
    expect(client.mock.calls[0][0].method).toBe("GET");
    expect(client.mock.calls[0][0].url).toBe("/api/test");
    expect(serverError.message).toBe("Server error");
    expect(serverError.status).toBe(500);
  });

  it("makes API requests and handles request error correctly", async () => {
    const client = createMockHttpClient((_, reject) => {
      reject({
        request: {
          statusText: "Request timed out"
        }
      });
    });
    const request = createPortsWith({}, client);
    let requestError;

    try {
      await request({ url: "/api/test" });
    } catch (error) {
      requestError = tryParseJson(error);
    }

    expect(client).toHaveBeenCalled();
    expect(client.mock.calls[0][0].method).toBe("GET");
    expect(client.mock.calls[0][0].url).toBe("/api/test");
    expect(requestError.message).toBe("Request timed out");
  });

  it("makes API requests and handles client error correctly", async () => {
    const client = createMockHttpClient((_, reject) => {
      reject(new Error("Request setup failed"));
    });
    const request = createPortsWith({}, client);
    let clientError;

    try {
      await request({ url: "/api/test" });
    } catch (error) {
      clientError = tryParseJson(error);
    }

    expect(client).toHaveBeenCalled();
    expect(client.mock.calls[0][0].method).toBe("GET");
    expect(client.mock.calls[0][0].url).toBe("/api/test");
    expect(clientError.message).toBe("Request setup failed");
  });
});
