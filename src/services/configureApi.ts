import { mockWithFailure } from "../utilities/mocks";
import * as apiMethods from "./api/root.api";
import { TRequest } from "./configureHttpClient";
import { TLocalStorage } from "./configureLocalStorage";

type TApiMethods = typeof apiMethods;
export type TApi = {
  [key in keyof TApiMethods]: TCurriedReturn<TApiMethods[key]>;
};

export const configureApi = (
  request: TRequest,
  localStorage: TLocalStorage
): TApi =>
  Object.keys(apiMethods).reduce<any>(
    (methods, method) => ({
      ...methods,
      [method]: (apiMethods as any)[method](request, localStorage)
    }),
    {}
  );

export const configureMockApi = () => {
  const mockApiMethods = <M>(methods: M) => {
    const mockMethods: {
      [key in keyof M]: jest.Mock<Promise<any>>;
    } = {} as any;

    for (const index of Object.keys(methods) as (keyof M)[]) {
      mockMethods[index] = mockWithFailure(
        `API method '${index}' not implemented in test.`
      );
    }

    return mockMethods;
  };

  return mockApiMethods(apiMethods);
};

export type TMockApi = ReturnType<typeof configureMockApi>;
