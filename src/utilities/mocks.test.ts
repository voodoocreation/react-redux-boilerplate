import { failure, success } from "../models/root.models";
import {
  createMockElement,
  mockWithFailure,
  mockWithSuccess,
  mockWithSuccessPayload
} from "./mocks";

describe("[utilities] Mock response", () => {
  describe("createMockElement", () => {
    it("returns a fake object with default dimensions", () => {
      expect(createMockElement().getBoundingClientRect()).toEqual({
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      });
    });

    it("returns a fake object with provided dimensions", () => {
      expect(
        createMockElement(100, 100, 10, 10).getBoundingClientRect()
      ).toEqual({
        bottom: 110,
        left: 10,
        right: 110,
        top: 10
      });
    });
  });

  describe("mockWithSuccess", () => {
    it("creates an async mock function that instantly resolves with a success object containing the provided data", async () => {
      const data = { test: "Successful" };
      const mock = mockWithSuccess(data);

      expect(await mock()).toEqual(success(data));
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  describe("mockWithFailure", () => {
    it("creates an async mock function that instantly resolves with a failure object containing the provided message", async () => {
      const message = "Server error";
      const mockResponse = mockWithFailure(message);

      expect(await mockResponse()).toEqual(failure(message));
      expect(mockResponse).toHaveBeenCalledTimes(1);
    });
  });

  describe("mockWithSuccessPayload", () => {
    it("creates an async mock function that returns a success object with the payload as the data", async () => {
      const payload = { test: "Successful" };
      const mock = mockWithSuccessPayload();

      expect(await mock(payload)).toEqual(success(payload));
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
