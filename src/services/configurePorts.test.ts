import { mockWithResolvedPromise } from "jest-mocks";

import { failure } from "../models/response.models";
import { mockWithFailure } from "../utilities/mocks";
import * as apiMethods from "./api/root.api";
import { configureApi } from "./configureApi";
import { configurePorts, configureTestPorts } from "./configurePorts";

describe("[services] Ports", () => {
  describe("when creating the ports object, with all ports defined", () => {
    const mockRequest = mockWithResolvedPromise({});
    const ports = configurePorts({
      api: configureApi(mockRequest),
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

    it("binds dataLayer.push correctly", () => {
      ports.dataLayer.push({ event: "test.event" });

      expect(ports.dataLayer).toContainEqual({ event: "test.event" });
    });
  });

  describe("when creating the ports object, with no dataLayer or features defined", () => {
    const ports = configurePorts({
      api: configureApi(mockWithResolvedPromise({}))
    });

    it("has all ports defined", () => {
      expect(ports).toHaveProperty("api");
      expect(ports).toHaveProperty("dataLayer");
      expect(ports).toHaveProperty("features");
    });

    it("has all API methods defined", () => {
      expect(Object.keys(ports.api)).toEqual(Object.keys(apiMethods));
    });

    it("binds dataLayer.push correctly", () => {
      ports.dataLayer.push({ event: "test.event" });

      expect(ports.dataLayer).toContainEqual({ event: "test.event" });
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

    it("binds dataLayer.push correctly", () => {
      ports.dataLayer.push({ event: "test.event" });

      expect(ports.dataLayer).toContainEqual({ event: "test.event" });
    });

    it("merges API methods correctly", async () => {
      expect(await ports.api.fetchApiData()).toEqual(failure("Server error"));
    });
  });

  describe("when creating the mock ports object, with no ports defined", () => {
    const ports = configureTestPorts({});

    it("has all ports defined", () => {
      expect(ports).toHaveProperty("api");
      expect(ports).toHaveProperty("dataLayer");
      expect(ports).toHaveProperty("features");
    });

    it("has all API methods defined", () => {
      expect(Object.keys(ports.api)).toEqual(Object.keys(apiMethods));
    });

    it("binds dataLayer.push correctly", () => {
      ports.dataLayer.push({ event: "test.event" });

      expect(ports.dataLayer).toContainEqual({ event: "test.event" });
    });

    it("default mocked API methods function correctly", async () => {
      const payload = { isSuccessful: true };

      expect(await ports.api.fetchApiData(payload)).toEqual(
        failure("API method 'fetchApiData' not implemented.")
      );
    });
  });
});
