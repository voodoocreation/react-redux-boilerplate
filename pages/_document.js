import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import css from '../src/scss/index.scss';

export default class extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { req } = context;

    const { html, head, errorHtml, chunks } = context.renderPage();

    return {
      ...props,
      html,
      head,
      errorHtml,
      chunks,
      locale: req.locale,
      intlMessages: req.intlMessages,
    };
  }

  render() {
    const styles = (process.env.NODE_ENV !== 'production')
      ? <style>{css}</style>
      : (
        <link
          rel="stylesheet"
          href={`/assets/app.css?${this.props.__NEXT_DATA__.buildStats['app.js'].hash}`}
        />
      );

    return (
      <html lang={this.props.locale}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          />
          {styles}
        </Head>
        <body>
          <main role="main" className="container">
            <Main />
          </main>
          <NextScript />
        </body>
      </html>
    );
  }
}
