import { NextDocumentContext as Context } from "next/document";
import * as React from "react";
import { addLocaleData, injectIntl, IntlProvider } from "react-intl";

// tslint:disable:no-submodule-imports
import * as en from "react-intl/locale-data/en";
// tslint:enable:no-submodule-imports

addLocaleData([...en]);

interface IProps {
  intlMessages?: {};
  locale?: string;
  now?: number;
}

export default (Page: any) => {
  const IntlPage = injectIntl(Page);

  const getIntlProps = ({ ctx }: { ctx: Context }) => {
    const requestProps =
      typeof window === "undefined"
        ? ctx.req
        : window.__NEXT_DATA__.props.initialProps;
    const { locale, intlMessages } = requestProps;
    const now = Date.now();

    return { locale, intlMessages, now };
  };

  class PageWithIntl extends React.Component<IProps> {
    public static defaultProps = {
      locale: "en-NZ",
      now: Date.now()
    };

    public static async getInitialProps(pageProps: any) {
      let props;

      if (typeof Page.getInitialProps === "function") {
        props = await Page.getInitialProps(pageProps);
      }

      const intlProps = getIntlProps(pageProps);

      return { ...props, ...intlProps };
    }

    public render() {
      const { locale, intlMessages, now, ...props } = this.props;

      return (
        <IntlProvider initialNow={now} locale={locale} messages={intlMessages}>
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  }

  return PageWithIntl;
};
