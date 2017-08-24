import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import css from '../src/scss/index.scss';

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks };
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
      <html lang="en-NZ">
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
