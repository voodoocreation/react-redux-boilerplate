import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import { NextDocumentContext as Context } from "next/document";
import * as React from "react";
import { Provider, Store } from "react-redux";

import routes from "../next.routes";
import * as actions from "../src/actions/root.actions";
import connectIntl from "../src/helpers/connectIntl";
import createStore from "../src/store/root.store";

import Shell from "../src/components/containers/Shell/Shell";

interface IProps {
  Component: any;
  ctx: Context & { store: any };
  pageProps: any;
  store: Store<any>;
}

class Application extends App {
  public static async getInitialProps({ Component, ctx }: IProps) {
    let pageProps = {};

    const unsubscribe = ctx.store.subscribe(() => {
      const state = ctx.store.getState();

      if (state.page.error && ctx.res) {
        ctx.res.statusCode = state.page.error.status;
        unsubscribe();
      }
    });

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  public componentWillMount() {
    routes.Router.onRouteChangeStart = this.onRouteChangeStart;
    routes.Router.onRouteChangeComplete = this.onRouteChangeComplete;
    routes.Router.onRouteChangeError = this.onRouteChangeError;
  }

  public render() {
    const { Component, pageProps, store } = this.props as IProps;

    return (
      <Container>
        <Provider store={store}>
          <Shell>
            <Component {...pageProps} />
          </Shell>
        </Provider>
      </Container>
    );
  }

  private onRouteChangeStart = (path: string) => {
    const { store } = this.props as IProps;

    store.dispatch(actions.changeRoute.started(path));
  };

  private onRouteChangeComplete = (path: string) => {
    const { store } = this.props as IProps;

    store.dispatch(actions.changeRoute.done({ params: path }));
  };

  private onRouteChangeError = (error: Error, path: string) => {
    const { store } = this.props as IProps;

    store.dispatch(
      actions.changeRoute.failed({
        error: {
          message: error.toString(),
          status: 500
        },
        params: path
      })
    );
  };
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })(connectIntl(Application))
);
