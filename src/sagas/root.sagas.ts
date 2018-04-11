import { all, fork } from "redux-saga/effects";

import { fetchApiDataSaga } from "./example.sagas";

const mapSagas = (ports: any, effect: any) => (arr: any) =>
  arr.reduce((acc: any, curr: any) => [...acc, effect(curr(ports))], []);

export default (ports: IStorePorts) =>
  function*() {
    yield all(mapSagas(ports, fork)([fetchApiDataSaga]));
  };
