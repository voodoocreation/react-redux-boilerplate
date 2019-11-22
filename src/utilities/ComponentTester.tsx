import { mount, render, shallow } from "enzyme";
import merge from "lodash.merge";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { IntlProvider as ReduxIntlProvider } from "react-intl-redux";
import { Provider } from "react-redux";
import { DeepPartial, Dispatch, Middleware } from "redux";
import { AnyAction } from "typescript-fsa";

import messages from "../locales/en-NZ";
import { TStoreState } from "../reducers/root.reducers";
import {
  configureTestPorts,
  IPorts,
  ITestPorts,
  ITestPortsParam
} from "../services/configurePorts";
import { configureStore } from "../store/root.store";

export type TRenderMethods = (...args: any[]) => any;

interface IConnectedReturn<
  M extends TRenderMethods,
  P extends React.ComponentProps<any> = React.ComponentProps<any>
> {
  dispatch: Dispatch<AnyAction>;
  ports: ITestPorts;
  props: Required<P>;
  store: () => TStoreState;
  wrapper: ReturnType<M>;
}

interface IReturn<
  M extends TRenderMethods,
  P extends React.ComponentProps<any> = React.ComponentProps<any>
> {
  props: Required<P>;
  wrapper: ReturnType<M>;
}

export default class ComponentTester<
  C extends React.ComponentType<any>,
  IC extends boolean,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> {
  // Properties that remain throughout instance lifecycle
  protected defaultChildren?: React.ReactNode;
  protected defaultPorts: DeepPartial<ITestPorts> = {};
  protected defaultProps: Partial<P> = {};
  protected defaultReduxState: DeepPartial<TStoreState> = {};

  // Properties that are cleared whenever shallow/mount/render are called
  protected reduxHistoryStore: AnyAction[] = [];
  protected children?: React.ReactNode;
  protected ports: DeepPartial<ITestPorts> = {};
  protected props: Partial<P> = {};
  protected reduxState: DeepPartial<TStoreState> = {};

  constructor(
    protected readonly Component: C,
    protected readonly isConnected?: IC
  ) {
    this.Component = Component;
    this.isConnected = isConnected;
  }

  public withDefaultChildren(children: React.ReactNode) {
    this.defaultChildren = children;

    return this;
  }

  public withDefaultPorts(ports: ITestPortsParam) {
    this.defaultPorts = ports;

    return this;
  }

  public withDefaultProps(props: Partial<P>) {
    this.defaultProps = props;

    return this;
  }

  public withDefaultReduxState(state: DeepPartial<TStoreState>) {
    this.defaultReduxState = state;

    return this;
  }

  public withChildren(children: React.ReactNode) {
    this.children = children;

    return this;
  }

  public withPorts(ports: ITestPortsParam) {
    this.ports = ports;

    return this;
  }

  public withProps(props: Partial<P>) {
    this.props = props;

    return this;
  }

  public withReduxState(reduxState: DeepPartial<TStoreState>) {
    this.reduxState = reduxState;

    return this;
  }

  get reduxHistory() {
    return this.reduxHistoryStore;
  }

  public resetReduxHistory = () => {
    this.reduxHistoryStore = [];
  };

  public shallow = () => this.renderWithMethod(shallow);

  public mount = () => this.renderWithMethod(mount);

  public render = () => this.renderWithMethod(render);

  protected renderWithMethod = <M extends TRenderMethods>(method: M) => {
    const mergedProps = merge(
      {
        children: this.children || this.defaultChildren
      },
      this.defaultProps,
      this.props
    ) as P;

    let wrapper: ReturnType<M>;
    let result: IConnectedReturn<M, P> | IReturn<M, P>;
    const defaultLocale = "en-NZ";
    const locale = navigator.language;

    if (this.isConnected) {
      const { ports, store } = this.configureStore();

      const WrappingComponent: React.FC = ({ children }) => (
        <Provider store={store}>
          <ReduxIntlProvider defaultLocale="en-NZ" locale={locale}>
            {children}
          </ReduxIntlProvider>
        </Provider>
      );

      if (method === mount) {
        wrapper = method(<this.Component {...mergedProps} />, {
          wrappingComponent: WrappingComponent
        });
      } else {
        wrapper = method(
          <WrappingComponent>
            <this.Component {...mergedProps} />
          </WrappingComponent>
        );
      }

      result = {
        dispatch: store.dispatch,
        ports,
        props: mergedProps,
        store: () => store.getState(),
        wrapper
      };
    } else {
      const WrappingComponent: React.FC = ({ children }) => (
        <IntlProvider
          defaultLocale={defaultLocale}
          locale={locale}
          messages={messages}
        >
          {children}
        </IntlProvider>
      );

      if (method === mount) {
        wrapper = method(<this.Component {...mergedProps} />, {
          wrappingComponent: WrappingComponent
        });
      } else {
        wrapper = method(
          <WrappingComponent>
            <this.Component {...mergedProps} />
          </WrappingComponent>
        );
      }

      result = {
        props: mergedProps,
        wrapper
      };
    }

    this.children = undefined;
    this.ports = {};
    this.props = {};
    this.reduxState = {};

    return result as IC extends true ? IConnectedReturn<M, P> : IReturn<M, P>;
  };

  protected reduxHistoryMiddleware: Middleware = () => next => action => {
    this.reduxHistoryStore.push(action);
    return next(action);
  };

  protected configureStore = () => {
    this.resetReduxHistory();

    const mergedPorts = merge(
      {},
      this.defaultPorts,
      this.ports
    ) as ITestPortsParam;
    const mergedReduxState: DeepPartial<TStoreState> = merge(
      {},
      this.defaultReduxState,
      this.reduxState
    );

    const ports: any = configureTestPorts(mergedPorts);

    const middlewares = [this.reduxHistoryMiddleware];

    const store = configureStore(
      mergedReduxState,
      ports as IPorts,
      middlewares
    );

    return {
      ports,
      store
    };
  };
}
