import merge from "lodash.merge";
import SagaTester from "redux-saga-tester";

import rootReducer from "../reducers/root.reducers";
import rootSaga from "../sagas/root.sagas";

const g: any = global;

export default (fromTestStore: {}, fromTestPorts: {}) => {
  const initialState = merge({}, fromTestStore);
  const ports = merge(
    {
      api: {},
      dataLayer: g.dataLayer,
      maps: g.google.maps
    },
    fromTestPorts
  );

  const sagaTester = new SagaTester({
    initialState,
    reducers: rootReducer
  });
  sagaTester.start(rootSaga(ports));

  return {
    dispatch: (action: any) => sagaTester.dispatch(action),
    findAction: (actionFromTest: any) =>
      sagaTester
        .getCalledActions()
        .find((action: any) => action.type === actionFromTest().type),
    sagaTester,
    store: () => sagaTester.getState()
  };
};
