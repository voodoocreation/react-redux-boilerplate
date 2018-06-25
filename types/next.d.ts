declare module "next" {
  export interface IContext {
    asPath: string;
    err?: {
      statusCode: string | number;
    };
    pathname: string;
    query: string;
    renderPage: () => { html: any; head: any; errorHtml: any; chunks: any };
    req: {
      antdLocale: {};
      intlMessages: {};
      locale: string;
      localeDataScript: string;
      messages: {};
    };
    res?: {
      statusCode: string | number;
    };
  }
}

interface INextPageComponentMethods {
  getInitialProps?(props: any): Promise<any>;
}
type NextPageComponent<P> =
  | React.ComponentClass<P> & INextPageComponentMethods
  | React.StatelessComponent<P> & INextPageComponentMethods;
