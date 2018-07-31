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

describe("[app] App root", () => {
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
  });

  it("mounts application correctly on the server", async () => {
    g.isServer = true;
    const { actual } = await setup(mount, {
      ctx: { isServer: g.isServer }
    });

    expect(actual.render()).toMatchSnapshot();
  });

  it("mounts application correctly on the client", async () => {
    const { actual } = await setup(mount);

    expect(actual.render()).toMatchSnapshot();
  });

  it("gets `initialProps` from component correctly", async () => {
    const test = "Test";
    const Component: any = () => <div className="PageComponent" />;
    Component.getInitialProps = async () => ({ test });
    const { props } = await setup(mount, { Component });

    expect(props.initialProps.pageProps).toEqual({ test });
  });

  describe("router events", async () => {
    it("onRouteChangeStart is handled correctly", async () => {
      const { props } = await setup(mount);

      routes.Router.onRouteChangeStart("/");

      expect(props.store.getState().page.transitioningTo).toBe("/");
    });

    it("onRouteChangeComplete is handled correctly", async () => {
      const { props } = await setup(mount);

      routes.Router.onRouteChangeComplete("/");

      expect(props.store.getState().page.transitioningTo).toBeUndefined();
      expect(props.store.getState().page.currentRoute).toBe("/");
    });

    it("onRouteChangeStart is handled correctly", async () => {
      const { props } = await setup(mount);

      routes.Router.onRouteChangeError(new Error("Server error"), "/");

      expect(props.store.getState().page.transitioningTo).toBeUndefined();
      expect(props.store.getState().page.error).toEqual({
        message: "Error: Server error",
        status: 500
      });
    });
  });
});
