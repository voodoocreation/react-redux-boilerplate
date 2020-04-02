import { resolvedPromise } from "jest-mocks";

import { failure, success } from "../models/root.models";

export const createMockElement = (
  width = 0,
  height = 0,
  top = 0,
  left = 0
) => ({
  getBoundingClientRect: () => ({
    bottom: top + height,
    left,
    right: left + width,
    top,
  }),
});

export const mockWithSuccess = <T>(data: T) =>
  jest.fn(() => resolvedPromise(success(data)));

export const mockWithFailure = (message: string) =>
  jest.fn(() => resolvedPromise(failure(message)));

export const mockWithSuccessPayload = () =>
  jest.fn(<P>(payload: P) => resolvedPromise(success(payload)));
