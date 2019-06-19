import axios, { Method } from "axios";
import { camelizeKeys } from "humps";

interface IOptions {
  apiUrl?: string;
}

interface IRequestOptions {
  url: string;
  method?: Method;
  body?: any;
  shouldCamelizeKeys?: boolean;
}

export type TRequest = (options: IRequestOptions) => Promise<any>;

export class ServerError extends Error {
  public readonly response: Response;
  public readonly data: any;

  constructor(message: string, response: Response, data: any) {
    super(message);

    this.response = response;
    this.data = data;
  }
}

export const configureHttpClient = (config: IOptions = {}) => async ({
  url,
  method = "GET",
  body
}: IRequestOptions) => {
  try {
    const response = await axios({
      baseURL: config.apiUrl || "",
      data: body,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      method,
      url
    });

    return camelizeKeys(response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new ServerError(
        `Request failed with status code ${error.response.status}`,
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
