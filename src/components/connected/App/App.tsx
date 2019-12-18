import "../../../../polyfills";

import { NextPageContext } from "next";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import NextApp, { AppContext, AppProps } from "next/app";

import * as React from "react";
import { IntlProvider } from "react-intl-redux";
import { Provider } from "react-redux";

import routes from "../../../../next.routes";
import * as actions from "../../../actions/root.actions";
import { isServer } from "../../../helpers/dom";
import * as selectors from "../../../selectors/root.selectors";
import { createStore, TStore } from "../../../store/root.store";
import Page from "../Page/Page";

export interface IPageContext extends NextPageContext {
  store: TStore;
  isServer: boolean;
}

export interface IAppContext extends AppContext {
  store: TStore;
  ctx: IPageContext;
}

interface IProps extends AppProps {
  intlProps: {
    locale: string;
  };
  store: TStore;
}

const getIntlProps = (ctx: NextPageContext) => {
  const requestProps = isServer()
    ? ctx.req
    : window.__NEXT_DATA__.props.initialProps.intlProps;
  const { locale } = requestProps;

  return {
    locale
  };
};

// @ts-ignore-next-line
export class App extends NextApp<IProps> {
  public static async getInitialProps({ ctx, Component }: IAppContext) {
    let pageProps = {};

    const unsubscribe = ctx.store.subscribe(() => {
      const error = selectors.getAppError(ctx.store.getState());

      if (error && ctx.res) {
        ctx.res.statusCode = error.status;
        unsubscribe();
      }
    });

    const intlProps = getIntlProps(ctx);

    ctx.store.dispatch(
      actions.initApp.started({
        locale: intlProps.locale
      })
    );

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, intlProps };
  }

  constructor(props: IProps) {
    super(props);

    routes.Router.onRouteChangeStart = this.onRouteChangeStart;
    routes.Router.onRouteChangeComplete = this.onRouteChangeComplete;
    routes.Router.onRouteChangeError = this.onRouteChangeError;
  }

  public componentDidMount() {
    const { store } = this.props;

    store.dispatch(actions.setCurrentRoute(routes.Router.route));
  }

  public render() {
    const { Component, intlProps, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <IntlProvider defaultLocale="en-NZ" locale={intlProps.locale}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </IntlProvider>
      </Provider>
    );
  }

  private onRouteChangeStart = (path: string) => {
    const { store } = this.props;

    store.dispatch(actions.changeRoute.started(path));
  };

  private onRouteChangeComplete = (path: string) => {
    const { store } = this.props;

    store.dispatch(actions.changeRoute.done({ params: path, result: {} }));
  };

  private onRouteChangeError = (error: Error, path: string) => {
    const { store } = this.props;

    store.dispatch(
      actions.changeRoute.failed({
        error: error.message,
        params: path
      })
    );
  };
}

export default withRedux(createStore)(withReduxSaga(App));
