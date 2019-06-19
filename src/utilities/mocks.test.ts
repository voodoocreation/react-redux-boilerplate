import { failure, success } from "../models/root.models";
import {
  createMockElement,
  findMockCall,
  mockWithFailure,
  mockWithRejectedPromise,
  mockWithResolvedPromise,
  mockWithSuccess,
  mockWithSuccessPayload,
  rejectedPromise,
  resolvedPromise
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

  describe("findMockCall", () => {
    it("returns the expected mock call", () => {
      const mockFunction = jest.fn((str: string) => str);

      mockFunction("First call");
      mockFunction("Second call");

      expect(findMockCall(mockFunction, "Second call")).toEqual([
        "Second call"
      ]);
    });
  });

  describe("resolvedPromise", () => {
    it("returns a promise that instantly resolves with the provided data", async () => {
      const data = { test: true };

      expect(await resolvedPromise(data)).toEqual(data);
    });
  });

  describe("rejectedPromise", () => {
    it("returns a promise that instantly rejects with the provided error message", async () => {
      let rejectedError;
      const message = "Rejected";

      try {
        await rejectedPromise(message);
      } catch (error) {
        rejectedError = error;
      }

      expect(rejectedError).toEqual(new Error(message));
    });
  });

  describe("mockWithResolvedPromise", () => {
    it("creates an async mock function that instantly resolves with the provided data", async () => {
      const data = { test: "Successful" };
      const mock = mockWithResolvedPromise(data);

      expect(await mock()).toEqual(data);
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  describe("mockWithRejectedPromise", () => {
    it("returns an async mock function that instantly rejects with the provided error message", async () => {
      let rejectedError;
      const message = "Rejected";
      const mock = mockWithRejectedPromise(message);

      try {
        await mock();
      } catch (error) {
        rejectedError = error;
      }

      expect(rejectedError).toEqual(new Error(message));
      expect(mock).toHaveBeenCalledTimes(1);
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
