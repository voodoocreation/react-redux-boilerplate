/**
 * Response error handler.
 *
 * @param  {Response} response  A Response http object.
 * @return {Promise}            Either a promise (json) or a thrown error.
 */
const errorHandler = (response) => {
  const contentType = response.headers.get('content-type');
  const responseFulfilled = response.ok && response.status >= 200 && response.status < 400;
  const responseIsJSON = contentType && contentType.indexOf('application/json') !== -1;

  if (responseFulfilled) {
    if (responseIsJSON) {
      return response.json();
    }

    return response.text();
  }

  const genericHTTPMessage = `Error in response: ${response.url}, Status: ${response.status} : ${response.statusText}`;
  // Reject the promise on HTTP error status
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.warn(genericHTTPMessage);
  }

  if (responseIsJSON) {
    return response.json().then(err =>
      Promise.reject(
        JSON.stringify({
          name: 'apiError',
          errors: err,
        }),
      ),
    );
  }

  return Promise.reject(
    JSON.stringify({
      name: 'apiError',
      errors: [{ errorCode: 'SERVER_REQUEST_FAILED', message: genericHTTPMessage }],
    }),
  );
};

export default errorHandler;
