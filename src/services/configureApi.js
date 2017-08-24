import 'isomorphic-fetch';
import merge from 'lodash.merge';

import handleErrors from './errorHandler';
import apiMethods from './apiMethods';

// In production, our API runs on the root of the domain.
// Locally, it's on a separate host.
const defaults = {
  url: '/api',
  appClientName: '',
};

const buildRequestOptions = (method, apiSettings) => ({
  method,
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Client-name': apiSettings.appClientName,
  },
});

export const callApi = (settings, ports, adapters) => (path, options) =>
  fetch(`${settings.url}${path}`, options)
    .then(handleErrors)
    .then((data) => {
      if (/translation/.test(path)) {
        return data;
      }

      return adapters.formatApiResponse(data);
    })
    .catch((err) => {
      throw new Error(err);
    });

const configureApiClient = (settings, ports, adapters) => {
  const callApiFn = callApi(settings, ports, adapters);

  return {
    get: (path, opts) => callApiFn(path, merge(buildRequestOptions('GET', settings), opts)),
    post: (path, opts) => callApiFn(path, merge(buildRequestOptions('POST', settings), opts)),
  };
};

const curryMapOfFuncsWithArityOf1 = (obj, arg) =>
  Object.keys(obj).reduce((next, key) => ({ ...next, [key]: obj[key](arg) }), {});

export default ({
  options,
  ports = {},
  adapters = {
    formatApiResponse: response => response,
  },
}) => curryMapOfFuncsWithArityOf1(
  apiMethods,
  configureApiClient(merge(defaults, options), ports, adapters),
);
