import { IncomingMessage } from "http";
import Document, {
  Head,
  Main,
  NextDocumentContext as Context,
  NextScript
} from "next/document";
import * as React from "react";

// tslint:disable-next-line
const css = require("../../../scss/index.scss");

const Meta: React.SFC<{}> = () =>
  (
    <React.Fragment>
      <meta charSet="UTF-8" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        name="viewport"
      />
    </React.Fragment>
  ) as React.ReactElement<any>;

export default class extends Document {
  public static async getInitialProps(context: Context) {
    const props = await context.renderPage();
    const req = context.req as IncomingMessage & {
      intlMessages: {};
      locale: string;
    };

    return {
      ...props,
      intlMessages: req.intlMessages,
      locale: req.locale
    };
  }

  public render() {
    const styles =
      process.env.NODE_ENV !== "production" ? (
        <style dangerouslySetInnerHTML={{ __html: css }} />
      ) : (
        <link
          href={`/assets/main.css?${this.props.__NEXT_DATA__.buildId}`}
          rel="stylesheet"
        />
      );

    return (
      <html lang={this.props.locale}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.add("isClientRendered");`
            }}
          />
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            rel="stylesheet"
          />

          <Meta />

          {styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
