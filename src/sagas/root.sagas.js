import { all, fork } from 'redux-saga/effects';

import { fetchApiDataSaga } from './example.sagas';

export const rootSaga = ports =>
  function* rootSagaCurried() {
    yield all([
      fork(fetchApiDataSaga(ports)),
    ]);
  };

export default { rootSaga };
