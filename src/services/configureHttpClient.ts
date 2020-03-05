type THttpMethod =
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT";

export interface IHttpClientConfig {
  fetch: typeof window.fetch;
}

export interface IRequestOptions {
  body?: any;
  method?: THttpMethod;
  params?: Record<string, string>;
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

export const configureHttpClient = (
  config: IHttpClientConfig
): TRequest => async (url, options = {}) => {
  const { body, headers, method = "GET", params } = options;

  const requestOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    method
  };

  let query = "";
  if (params) {
    query = `?${new URLSearchParams(params).toString()}`;
  }

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }
  const response = await config.fetch(`${url}${query}`, requestOptions);

  // Get the response as text first, because if it's a server error it may not be JSON
  const textData = await response.text();
  let data: any;

  try {
    data = JSON.parse(textData);
  } catch (error) {
    data = textData;
  }

  if (response.ok) {
    return data;
  }

  throw new ServerError(
    `Request failed with status code ${response.status}.`,
    response,
    data
  );
};
