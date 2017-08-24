import SagaTester from 'redux-saga-tester';
import merge from 'lodash.merge';

// import defaultIntl from '../locales/sources/en-nz/app.json';

import { rootReducer } from '../reducers/root.reducers';
import { rootSaga } from '../sagas/root.sagas';

function setupSagas(fromTestStore = {}, fromTestPorts = {}) {
  const initialState = merge({
  }, fromTestStore);
  const ports = {
    api: merge(
      {},
      {
        visibleFields: {
          get: jest.fn(),
          set: jest.fn(),
        },
      },
      fromTestPorts,
    ),
  };

  const sagaTester = new SagaTester({
    initialState,
    reducers: rootReducer(),
  });
  sagaTester.start(rootSaga(ports));

  return {
    sagaTester,
    actionsHistory: () => sagaTester.getCalledActions(),
    dispatch: action => sagaTester.dispatch(action),
    filterAction: actionFromTest =>
      sagaTester.getCalledActions().filter(action => action.type === actionFromTest().type),
    findAction: actionFromTest =>
      sagaTester.getCalledActions().find(action => action.type === actionFromTest().type),
    getLatestAction: () => sagaTester.getLatestCalledAction(),
    store: () => sagaTester.getState(),
    waitFor: action => sagaTester.waitFor(action),
    wasCalled: action => sagaTester.wasCalled(action),
  };
}

export default setupSagas;
