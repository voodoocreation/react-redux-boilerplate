import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import * as actions from "../actions/example.actions";
import { IPorts } from "../services/configurePorts";

export const fetchApiDataSaga = (ports: IPorts) =>
  function*(): SagaIterator {
    yield takeLatest(actions.fetchApiData.started, function*(): SagaIterator {
      const response = yield call(ports.api.fetchApiData);

      if (response.ok) {
        yield put(
          actions.fetchApiData.done({
            params: {},
            result: response.data
          })
        );
      } else {
        yield put(
          actions.fetchApiData.failed({
            error: response.message,
            params: []
          })
        );
      }
    });
  };
