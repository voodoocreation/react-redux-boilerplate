import { mount } from "enzyme";
import merge from "lodash.merge";
import * as React from "react";

import App from "./App";

jest.mock("../../../../next.routes", () => ({
  Router: {
    route: ""
  }
}));

import routes from "../../../../next.routes";

const g: any = global;

const setup = async (fn: any, fromTestProps?: any, isServer = false) => {
  jest.clearAllMocks();

  g.isServer = isServer;
  g.__NEXT_DATA__ = {
    props: {
      initialProps: {
        intlProps: {}
      }
    }
  };

  const Component = () => <div className="PageComponent" />;
  const appProps = merge(
    {
      Component,
      asPath: "",
      ctx: {
        isServer: false,
        pathname: "",
        query: {},
        req: {
          intlMessages: {},
          locale: "en-NZ"
        },
        res: {}
      },
      router: {
        pathname: ""
      }
    },
    fromTestProps
  );
  const initialProps = await App.getInitialProps(appProps);
  const props = {
    ...appProps,
    ...initialProps
  };

  return {
    actual: fn(<App {...props} />),
    props
  };
};

describe("[connected] <App />", () => {
  const addEventListener = g.addEventListener;
  const removeEventListener = g.removeEventListener;

  beforeAll(() => {
    g.addEventListener = jest.fn((...args) => addEventListener(...args));
    g.removeEventListener = jest.fn((...args) => removeEventListener(...args));
  });

  it("mounts application correctly on the server", async () => {
    const { actual } = await setup(
      mount,
      {
        ctx: { isServer: g.isServer }
      },
      true
    );

    expect(actual.render()).toMatchSnapshot();
    actual.unmount();
  });

  it("mounts application correctly on the client", async () => {
    const { actual } = await setup(mount);

    expect(actual.render()).toMatchSnapshot();
    actual.unmount();
  });

  it("gets `initialProps` from component correctly", async () => {
    const test = "Test";
    const Component: any = () => <div className="PageComponent" />;

    Component.getInitialProps = async () => ({ test });

    const { actual, props } = await setup(mount, { Component });

    expect(props.initialProps.pageProps).toEqual({ test });

    actual.unmount();
  });

  describe("when navigating within the app", () => {
    let result: any;

    it("mounts the component", async () => {
      result = await setup(mount);
    });

    it("handles the onRouteChangeStart event correctly", async () => {
      routes.Router.onRouteChangeStart("/");

      expect(result.props.ctx.store.getState().app.transitioningTo).toBe("/");
    });

    it("handles the onRouteChangeComplete event correctly", async () => {
      routes.Router.onRouteChangeComplete("/");

      expect(
        result.props.ctx.store.getState().app.transitioningTo
      ).toBeUndefined();
      expect(result.props.ctx.store.getState().app.currentRoute).toBe("/");
    });

    it("handles the onRouteChangeError event correctly", async () => {
      routes.Router.onRouteChangeError(new Error("Server error"), "/");

      expect(
        result.props.ctx.store.getState().app.transitioningTo
      ).toBeUndefined();
      expect(result.props.ctx.store.getState().app.error).toEqual({
        message: "Error: Server error",
        status: 500
      });
    });

    it("unmounts the component", () => {
      result.actual.unmount();
    });
  });
});
