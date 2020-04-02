import { AnyAction, DeepPartial, Middleware } from "redux";
import merge from "ts-deepmerge";

import {
  initialState as rootInitialState,
  TStoreState,
} from "../reducers/root.reducers";
import { configureTestPorts } from "../services/configurePorts";
import { configureStore, TStore } from "../store/root.store";

interface INextContextError {
  message: string;
  statusCode?: number;
}

export default class MockPageContext {
  private defaultError: INextContextError | undefined = undefined;
  private defaultQuery: Record<string, string> = {};
  private defaultReduxState: DeepPartial<TStoreState> = {};
  private defaultResponse: {} | undefined = undefined;

  private error: INextContextError | undefined = undefined;
  private query: Record<string, string> = {};
  private reduxState: DeepPartial<TStoreState> = {};
  private response: {} | undefined = undefined;

  private dispatchedActions: AnyAction[] = [];
  private store?: TStore;

  get reduxHistory() {
    return this.dispatchedActions;
  }

  get storeState() {
    return (this.store && this.store.getState()) as TStoreState;
  }

  public withDefaultError = (error?: INextContextError) => {
    this.defaultError = error;

    return this;
  };

  public withDefaultQuery = (query: Record<string, string>) => {
    this.defaultQuery = query;

    return this;
  };

  public withDefaultReduxState = (state: DeepPartial<TStoreState>) => {
    this.defaultReduxState = state;

    return this;
  };

  public withDefaultResponse = (response: {}) => {
    this.defaultResponse = response;

    return this;
  };

  public withError = (error?: INextContextError) => {
    this.error = error;

    return this;
  };

  public withQuery = (query: Record<string, string>) => {
    this.query = query;

    return this;
  };

  public withReduxState = (state: DeepPartial<TStoreState>) => {
    this.reduxState = state;

    return this;
  };

  public withResponse = (response: {}) => {
    this.response = response;

    return this;
  };

  public toObject = (isServer = false) => {
    this.dispatchedActions = [];
    this.store = configureStore(
      merge({}, rootInitialState, this.defaultReduxState, this.reduxState),
      configureTestPorts({}),
      [this.reduxHistoryMiddleware]
    );
    const err = this.error || this.defaultError;
    const query = merge({}, this.defaultQuery, this.query);
    const res = this.response || this.defaultResponse;

    this.error = undefined;
    this.query = {};
    this.reduxState = {};
    this.response = undefined;

    return {
      err,
      isServer,
      query,
      res,
      store: this.store,
    } as any;
  };

  public resetReduxHistory = () => {
    this.dispatchedActions = [];
  };

  protected reduxHistoryMiddleware: Middleware = () => (next) => (action) => {
    this.dispatchedActions.push(action);
    return next(action);
  };
}
