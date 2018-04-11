import { call, put, takeLatest } from "redux-saga/effects";

import * as actions from "../actions/example.actions";

const fetchApiData = (ports: IStorePorts) =>
  function*() {
    const res = yield call(ports.api.fetchApiData);

    if (res.ok) {
      yield put(actions.fetchApiData.done(res.data));
    } else {
      yield put(
        actions.fetchApiData.failed({ error: res.message, params: {} })
      );
    }
  };

export const fetchApiDataSaga = (ports: IStorePorts) =>
  function*() {
    yield takeLatest(actions.fetchApiData.started, fetchApiData(ports));
  };
