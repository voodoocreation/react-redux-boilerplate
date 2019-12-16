import * as React from "react";
import { IntlProvider as ReduxIntlProvider } from "react-intl-redux";
import { Provider } from "react-redux";
import { WrapperWithRedux as BaseWrapper } from "react-test-wrapper";
import { DeepPartial, Middleware } from "redux";
import merge from "ts-deepmerge";

import {
  initialState as rootInitialState,
  TStoreState
} from "../reducers/root.reducers";
import {
  configureTestPorts,
  IPorts,
  ITestPorts,
  ITestPortsParam
} from "../services/configurePorts";
import { configureStore } from "../store/root.store";

export default class WrapperWithRedux<
  C extends React.ComponentType<any>,
  S extends {} = TStoreState,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends BaseWrapper<C, S, P> {
  // Properties that remain throughout instance lifecycle
  protected defaultPorts: DeepPartial<ITestPorts> = {};

  // Scenario-specific properties that are cleared whenever shallow/mount/render are called
  protected scenarioPorts: DeepPartial<ITestPorts> = {};

  // Properties to be accessed via getters after mounting
  protected mergedPorts: DeepPartial<ITestPorts> = {};

  public get ports() {
    return this.mergedPorts as IPorts;
  }

  public withDefaultPorts = (ports: DeepPartial<ITestPorts>) => {
    this.defaultPorts = ports;

    return this;
  };

  public withPorts = (ports: DeepPartial<ITestPorts>) => {
    this.scenarioPorts = ports;

    return this;
  };

  protected WrappingComponent: React.FC = ({ children }) => (
    <Provider store={this.reduxStore!}>
      <ReduxIntlProvider defaultLocale="en-NZ" locale={navigator.language}>
        {children}
      </ReduxIntlProvider>
    </Provider>
  );

  protected createStore(
    initialState: DeepPartial<S>,
    middlewares: Middleware[]
  ) {
    this.mergedPorts = configureTestPorts(
      merge(this.defaultPorts, this.scenarioPorts) as ITestPortsParam
    );

    return configureStore(
      merge(rootInitialState, initialState) as TStoreState,
      this.mergedPorts as IPorts,
      middlewares
    );
  }

  protected reset() {
    super.reset();

    this.scenarioPorts = {};
  }
}
