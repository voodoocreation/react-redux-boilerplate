import * as React from "react";
import { connect, Provider } from "react-redux";
import { StoreCreator } from "redux";

// https://github.com/iliakan/detect-node
const checkServer = () =>
  Object.prototype.toString.call(global.process) === "[object process]";

const getOrCreateStore = (
  initStore: (initialState: {}) => StoreCreator,
  initialState: {} = {}
) => {
  // Always make a new store if server
  if (checkServer() || typeof window === "undefined") {
    return initStore(initialState);
  }

  // Store in global variable if client
  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = initStore(initialState);
  }
  return window.__NEXT_REDUX_STORE__;
};

export default (...args: any[]) => (Component: NextPageComponent<any>) => {
  // First argument is initStore, the rest are redux connect arguments and get passed
  const [initStore, ...connectArgs] = args;

  const ComponentWithRedux: React.SFC<any> & INextPageComponentMethods = (props) => {
    const { store, initialProps, initialState } = props;

    // Connect page to redux with connect arguments
    const ConnectedComponent = connect.apply(null, connectArgs)(Component);

    // Wrap with redux Provider with store
    // Create connected page with initialProps
    return React.createElement(
      Provider,
      {
        store:
          store && store.dispatch
            ? store
            : getOrCreateStore(initStore, initialState)
      },
      React.createElement(ConnectedComponent, initialProps)
    );
  };

  ComponentWithRedux.getInitialProps = async (props = {}) => {
    const isServer = checkServer();
    const store = getOrCreateStore(initStore);

    // Run page getInitialProps with store and isServer
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...props, isServer, store })
      : {};

    return {
      initialProps,
      initialState: store.getState(),
      store
    };
  };

  return ComponentWithRedux;
};
