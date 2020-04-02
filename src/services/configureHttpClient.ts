import axios from "axios";
import { camelizeKeys } from "humps";

type THttpMethod =
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT";

export interface IRequestOptions {
  data?: any;
  method?: THttpMethod;
  params?: Record<string, string | number | undefined>;
  headers?: Record<string, string>;
}

export type TRequest = (url: string, options?: IRequestOptions) => Promise<any>;

export class ServerError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
    public readonly data?: any
  ) {
    super(message);
  }
}

export const configureHttpClient = (): TRequest => async (
  url,
  options = {}
) => {
  const { data, headers, method = "GET", params } = options;

  try {
    const response = await axios({
      data,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
      method,
      params,
      url,
    });

    return camelizeKeys(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new ServerError(
        `Request failed with status code ${error.response.status}.`,
        error.response,
        camelizeKeys(error.response.data)
      );
    } else if (error.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser
      throw new Error(error.request.statusText);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};
