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
    top
  })
});

export const findMockCall = (mockFn: any, ...args: any[]) =>
  mockFn.mock.calls.find((call: any) =>
    args.reduce((acc, curr, index) => acc && call[index] === curr, true)
  );

export const resolvedPromise = <T>(data: T) =>
  new Promise<T>(resolve => resolve(data));

export const rejectedPromise = (message: string) =>
  new Promise<any>((_, reject) => reject(new Error(message)));

export const mockWithResolvedPromise = <T>(data: T) =>
  jest.fn(() => resolvedPromise(data));

export const mockWithRejectedPromise = (message: string) =>
  jest.fn(() => rejectedPromise(message));

export const mockWithSuccess = <T>(data: T) =>
  jest.fn(() => resolvedPromise(success(data)));

export const mockWithFailure = (message: string) =>
  jest.fn(() => resolvedPromise(failure(message)));

export const mockWithSuccessPayload = () =>
  jest.fn(<P>(payload: P) => resolvedPromise(success(payload)));
