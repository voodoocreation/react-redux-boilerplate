import { takeLatest } from 'redux-saga/effects';
import makeApiRequestSaga from './api.sagas';

import * as actions from '../actions/example.actions';

const fetchApiData = ports => makeApiRequestSaga(actions.fetchApiData, ports.api.fetchApiData);

export const fetchApiDataSaga = ports => function* _() {
  yield takeLatest(
    actions.fetchApiData.request,
    fetchApiData(ports),
  );
};

export default { fetchApiDataSaga };
