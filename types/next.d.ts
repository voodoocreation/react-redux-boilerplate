declare module "next" {
  export interface IContext {
    pathname: string;
    query: string;
    asPath: string;
    req: {
      locale: string;
      localeDataScript: string;
      messages: {};
      antdLocale: {};
      intlMessages: {};
    };
    res?: object;
    renderPage: () => { html: any; head: any; errorHtml: any; chunks: any };
  }
}

interface INextPageComponentMethods {
  getInitialProps?(props: any): Promise<any>;
}
type NextPageComponent<P> = React.ComponentClass<P> & INextPageComponentMethods | React.StatelessComponent<P> & INextPageComponentMethods;
