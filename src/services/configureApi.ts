import { mockWithFailure } from "../utilities/mocks";
import * as apiMethods from "./api/root.api";
import { TRequest } from "./configureHttpClient";

export type TApi = ReturnType<typeof configureApi>;
export type TMockApi = ReturnType<typeof configureMockApi>;

export const configureApi = (request: TRequest) => {
  const bindMethods = <M>(methods: M) => {
    const boundMethods: {
      [key in keyof M]: TCurriedReturn<M[key]>;
    } = {} as any;

    for (const index of Object.keys(methods) as Array<keyof M>) {
      const method: any = methods[index];
      boundMethods[index] = method(request);
    }

    return boundMethods;
  };

  return bindMethods(apiMethods);
};

export const configureMockApi = () => {
  const mockApiMethods = <M>(methods: M) => {
    const mockMethods: {
      [key in keyof M]: jest.Mock<Promise<any>>;
    } = {} as any;

    for (const index of Object.keys(methods) as Array<keyof M>) {
      mockMethods[index] = mockWithFailure(
        `API method '${index}' not implemented.`
      );
    }

    return mockMethods;
  };

  return mockApiMethods(apiMethods);
};
