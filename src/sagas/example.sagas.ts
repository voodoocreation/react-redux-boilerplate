import { call, put, takeLatest } from "redux-saga/effects";

import * as actions from "../actions/example.actions";

export const fetchApiDataSaga = (ports: IStorePorts) =>
  function*() {
    yield takeLatest(actions.fetchApiData.started, function*() {
      const response = yield call(ports.api.fetchApiData);

      if (response.ok) {
        yield put(
          actions.fetchApiData.done({ params: {}, result: response.data })
        );
      } else {
        yield put(
          actions.fetchApiData.failed({ error: response.message, params: {} })
        );
      }
    });
  };
