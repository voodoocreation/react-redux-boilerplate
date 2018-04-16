import { IContext } from "next";
import Document, { Head, Main, NextScript } from "next/document";
import * as React from "react";

// tslint:disable-next-line
const css = require("../src/scss/index.scss");

export default class extends Document {
  public static async getInitialProps(context: IContext) {
    const props = await context.renderPage();
    const { req } = context;

    return {
      ...props,
      intlMessages: req.intlMessages,
      locale: req.locale
    };
  }

  public render() {
    const styles =
      process.env.NODE_ENV !== "production" ? (
        <style>{css}</style>
      ) : (
        <link
          href={`/assets/main.css?${this.props.__NEXT_DATA__.buildId}`}
          rel="stylesheet"
        />
      );

    return (
      <html lang={this.props.locale}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            content="width=device-width, initial-scale=1.0"
            name="viewport"
          />
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            rel="stylesheet"
          />
          {styles}
        </Head>
        <body>
          <main className="container" role="main">
            <Main />
          </main>
          <NextScript />
        </body>
      </html>
    );
  }
}
