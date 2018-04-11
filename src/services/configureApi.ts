import axios from "axios";
import { camelizeKeys } from "humps";

import fetchApiData from "./api/fetchApiData";

export const createApiWith = (ports: any) => ({
  fetchApiData: fetchApiData(ports)
});

export const createPortsWith = (config: any) => ({
  url,
  method = "GET",
  body
}: {
  url: string;
  method: string;
  body: string;
}) =>
  axios({
    baseURL: config.apiUrl,
    data: body,
    headers: {},
    method,
    url
  })
    .then(res => camelizeKeys(res.data))
    .catch(err => {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(JSON.stringify(camelizeKeys(err.response.data)));
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser
        throw new Error(err.request.statusText);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(err.message);
      }
    });
