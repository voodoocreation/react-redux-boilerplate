import { AnyAction, DeepPartial } from "redux";
import ReduxSagaTester from "redux-saga-tester";
import merge from "ts-deepmerge";
import { ActionCreator } from "typescript-fsa";

import rootReducer, {
  initialState,
  TStoreState
} from "../reducers/root.reducers";
import rootSaga from "../sagas/root.sagas";
import {
  configureTestPorts,
  IPorts,
  ITestPorts,
  ITestPortsParam
} from "../services/configurePorts";

export default class SagaTester {
  public readonly ports: ITestPorts;

  private readonly tester: ReduxSagaTester<TStoreState>;

  constructor(
    reduxState: DeepPartial<TStoreState> = {},
    ports: ITestPortsParam = {}
  ) {
    this.tester = new ReduxSagaTester<TStoreState>({
      initialState: merge(initialState, reduxState),
      reducers: rootReducer
    });

    this.ports = configureTestPorts(ports);

    this.tester.start(rootSaga, (this.ports as unknown) as IPorts);
  }

  get history() {
    return this.tester.getCalledActions();
  }

  get state() {
    return this.tester.getState();
  }

  public dispatch = (action: AnyAction) => this.tester.dispatch(action);

  public waitFor = async (
    action: ActionCreator<any> | AnyAction,
    isFutureOnly: boolean = false
  ) => this.tester.waitFor(action.type, isFutureOnly);
}
