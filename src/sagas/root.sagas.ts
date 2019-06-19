import { all, fork, ForkEffect } from "redux-saga/effects";

import { IPorts } from "../services/configurePorts";

import * as example from "./example.sagas";

const allSagas = {
  ...example
};

const mapSagas = (ports: IPorts) => {
  const mapped: ForkEffect[] = [];

  for (const saga of Object.values(allSagas)) {
    mapped.push(fork(saga(ports)));
  }

  return mapped;
};

export default function*(ports: IPorts) {
  yield all(mapSagas(ports));
}
