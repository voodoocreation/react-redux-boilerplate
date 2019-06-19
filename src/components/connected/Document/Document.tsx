import { IncomingMessage } from "http";
import Document, {
  DefaultDocumentIProps,
  DocumentProps,
  Head,
  Main,
  NextDocumentContext,
  NextScript
} from "next/document";
import * as React from "react";

const Meta: React.FC = () => (
  <React.Fragment>
    <meta charSet="UTF-8" />
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      name="viewport"
    />
  </React.Fragment>
);

interface IProps extends DefaultDocumentIProps, DocumentProps {
  locale: string;
}

export default class<P extends IProps> extends Document<P> {
  public static async getInitialProps(context: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(context);
    const props = await context.renderPage();
    const req = context.req as IncomingMessage & {
      intlMessages: {};
      locale: string;
    };

    return {
      ...initialProps,
      ...props,
      intlMessages: req.intlMessages,
      locale: req.locale || "en-NZ"
    };
  }

  public render() {
    const { locale } = this.props as P;

    return (
      <html lang={locale}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.add("isClientRendered");`
            }}
          />
          <Meta />
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
