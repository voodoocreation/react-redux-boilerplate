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

const setup = async (fn: any, fromTestProps?: any) => {
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

const g: any = global;

describe("[connected] <App />", () => {
  const addEventListener = g.addEventListener;
  const removeEventListener = g.removeEventListener;

  beforeAll(() => {
    g.addEventListener = jest.fn((...args) => addEventListener(...args));
    g.removeEventListener = jest.fn((...args) => removeEventListener(...args));
  });

  beforeEach(() => {
    g.isServer = false;
    g.__NEXT_DATA__ = {
      props: {
        initialProps: {
          intlProps: {}
        }
      }
    };
  });

  afterEach(() => {
    g.__NEXT_DATA__ = undefined;
    jest.clearAllMocks();
  });

  afterAll(() => {
    g.addEventListener = addEventListener;
    g.removeEventListener = removeEventListener;
  });

  it("mounts application correctly on the server", async () => {
    g.isServer = true;
    let isPassing = true;

    try {
      const { actual } = await setup(mount, {
        ctx: { isServer: g.isServer }
      });

      expect(actual.render()).toMatchSnapshot();
      actual.unmount();
    } catch (error) {
      isPassing = false;
    }

    expect(isPassing).toBe(true);
  });

  it("mounts application correctly on the client", async () => {
    let isPassing = true;

    try {
      const { actual } = await setup(mount);

      expect(actual.render()).toMatchSnapshot();
      actual.unmount();
    } catch (error) {
      isPassing = false;
    }

    expect(isPassing).toBe(true);
  });

  it("gets `initialProps` from component correctly", async () => {
    const test = "Test";
    const Component: any = () => <div className="PageComponent" />;
    Component.getInitialProps = async () => ({ test });
    const { actual, props } = await setup(mount, { Component });

    expect(props.initialProps.pageProps).toEqual({ test });

    actual.unmount();
  });

  describe("router events", () => {
    it("onRouteChangeStart is handled correctly", async () => {
      const { actual, props } = await setup(mount);

      routes.Router.onRouteChangeStart("/");

      expect(props.ctx.store.getState().page.transitioningTo).toBe("/");

      actual.unmount();
    });

    it("onRouteChangeComplete is handled correctly", async () => {
      const { actual, props } = await setup(mount);

      routes.Router.onRouteChangeComplete("/");

      expect(props.ctx.store.getState().page.transitioningTo).toBeUndefined();
      expect(props.ctx.store.getState().page.currentRoute).toBe("/");

      actual.unmount();
    });

    it("onRouteChangeStart is handled correctly", async () => {
      const { actual, props } = await setup(mount);

      routes.Router.onRouteChangeError(new Error("Server error"), "/");

      expect(props.ctx.store.getState().page.transitioningTo).toBeUndefined();
      expect(props.ctx.store.getState().page.error).toEqual({
        message: "Error: Server error",
        status: 500
      });

      actual.unmount();
    });
  });
});
