import { call, put } from 'redux-saga/effects';

/**
 * makeApiRequestSaga is a convenience wrapper around API methods. It adds some
 * post-processing and dispatches the start/success/failure actions.
 *
 * @param  {Object} actionCreators    An object of actionCreators.
 * @param  {Function} apiFn           The API function to call.
 * @param  {Function} postProcessor   The response post-processor.
 */
export default function makeApiRequestSaga(actionCreators, apiFn, postProcessor = null) {
  return function* apiRequestSaga(query, ...rest) {
    try {
      const response = yield call(apiFn, query, ...rest);
      const nextResponse = typeof postProcessor === 'function' ? postProcessor(response) : response;
      yield put(actionCreators.success(nextResponse));
    } catch (error) {
      const errorMessage = error.message ? error.message : 'Error';
      yield put(actionCreators.failure(errorMessage));
    }
  };
}
