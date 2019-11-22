// istanbul ignore file
import { IncomingMessage } from "http";
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript
} from "next/document";
import * as React from "react";

interface IProps extends DocumentProps {
  locale: string;
}

export default class<P extends IProps> extends Document<P> {
  public static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const props = await context.renderPage();
    const req = context.req as IncomingMessage & {
      locale: string;
    };

    return {
      ...initialProps,
      ...props,
      locale: req.locale || "en-NZ"
    };
  }

  public render() {
    const { locale } = this.props as P;

    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            name="viewport"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.add("isClientRendered");`
            }}
          />
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
