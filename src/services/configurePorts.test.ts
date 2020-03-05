import { mockWithResolvedPromise } from "jest-mocks";

import { failure } from "../models/root.models";
import { mockWithFailure } from "../utilities/mocks";
import * as apiMethods from "./api/root.api";
import { configurePorts, configureTestPorts } from "./configurePorts";

describe("[services] Ports", () => {
  describe("when creating the ports object", () => {
    const ports = configurePorts({
      fetch: mockWithResolvedPromise({}) as any
    });

    it("has all ports defined", () => {
      expect(ports).toHaveProperty("api");
      expect(ports).toHaveProperty("dataLayer");
      expect(ports).toHaveProperty("features");
    });

    it("has all API methods defined", () => {
      expect(Object.keys(ports.api)).toEqual(Object.keys(apiMethods));
    });
  });

  describe("when creating the mock ports object, with all ports defined", () => {
    const ports = configureTestPorts({
      api: {
        fetchApiData: mockWithFailure("Server error")
      },
      dataLayer: [],
      features: []
    });

    it("has all ports defined", () => {
      expect(ports).toHaveProperty("api");
      expect(ports).toHaveProperty("dataLayer");
      expect(ports).toHaveProperty("features");
    });

    it("has all API methods defined", () => {
      expect(Object.keys(ports.api)).toEqual(Object.keys(apiMethods));
    });

    it("merges API methods correctly", async () => {
      expect(await ports.api.fetchApiData()).toEqual(failure("Server error"));
    });
  });

  describe("when creating the mock ports object, with no ports defined", () => {
    const ports = configureTestPorts();

    it("has all ports defined", () => {
      expect(ports).toHaveProperty("api");
      expect(ports).toHaveProperty("dataLayer");
      expect(ports).toHaveProperty("features");
    });

    it("has all API methods defined", () => {
      expect(Object.keys(ports.api)).toEqual(Object.keys(apiMethods));
    });

    it("default mocked API methods function correctly", async () => {
      expect(await ports.api.fetchApiData()).toEqual(
        failure("API method 'fetchApiData' not implemented in test.")
      );
    });
  });
});
