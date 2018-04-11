import merge from "lodash.merge";
import SagaTester from "redux-saga-tester";

import rootReducer from "../reducers/root.reducers";
import rootSaga from "../sagas/root.sagas";

export default (fromTestStore = {}, fromTestPorts = {}) => {
  const initialState = merge({}, fromTestStore);
  const ports = {
    analytics: (_: any) => _,
    api: merge({}, fromTestPorts)
  };

  const sagaTester = new SagaTester({
    initialState,
    reducers: rootReducer
  });
  sagaTester.start(rootSaga(ports));

  return {
    actionsHistory: () => sagaTester.getCalledActions(),
    dispatch: (action: any) => sagaTester.dispatch(action),
    filterAction: (actionFromTest: any) =>
      sagaTester
        .getCalledActions()
        .filter((action: any) => action.type === actionFromTest().type),
    findAction: (actionFromTest: any) =>
      sagaTester
        .getCalledActions()
        .find((action: any) => action.type === actionFromTest().type),
    getLatestAction: () => sagaTester.getLatestCalledAction(),
    sagaTester,
    store: () => sagaTester.getState(),
    waitFor: (action: any) => sagaTester.waitFor(action),
    wasCalled: (action: any) => sagaTester.wasCalled(action)
  };
}
