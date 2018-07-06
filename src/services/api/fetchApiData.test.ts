import data from "../../../server/mocks/example.json";
import createMockHttpClient from "../../helpers/createMockHttpClient";
import { tryParseJson } from "../../transformers/transformData";
import { createPortsWith } from "../configureApi";
import fetchApiData from "./fetchApiData";

describe("[api] fetchApiData()", () => {
  it("handles successful request correctly", async () => {
    const client = createMockHttpClient(resolve => {
      resolve({
        data
      });
    });
    const fetch = fetchApiData(createPortsWith({}, client));
    const response = await fetch();

    expect(client).toHaveBeenCalled();
    expect(client.mock.calls[0][0].url).toBe("/example");
    expect(response.ok).toBe(true);
    expect(response.data).toEqual({ serverTest: true });
  });

  it("handles request failure correctly", async () => {
    const client = createMockHttpClient((_, reject) => {
      reject({
        response: {
          data: { message: "Server error" },
          status: 500
        }
      });
    });
    const fetch = fetchApiData(createPortsWith({}, client));
    const response = await fetch();

    expect(client).toHaveBeenCalled();
    expect(client.mock.calls[0][0].url).toBe("/example");
    expect(response.ok).toBe(false);
    expect(tryParseJson(response.message)).toEqual({
      message: "Server error",
      status: 500
    });
  });
});
