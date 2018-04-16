import { IContext } from "next";
import * as React from "react";
import { addLocaleData, injectIntl, IntlProvider } from "react-intl";

// tslint:disable:no-submodule-imports
import * as en from "react-intl/locale-data/en";
// tslint:enable:no-submodule-imports

addLocaleData([...en]);

interface IProps {
  intlMessages: {};
  locale: string;
  now: number;
}

export default (Page: NextPageComponent<any>) => {
  const IntlPage = injectIntl(Page);

  class PageWithIntl extends React.Component<IProps> {
    public static defaultProps = {
      locale: "en-NZ",
      now: Date.now()
    };

    public static async getInitialProps(context: IContext) {
      let props;

      if (typeof Page.getInitialProps === "function") {
        props = await Page.getInitialProps(context);
      }

      const requestProps = (typeof window === "undefined")
        ? context.req
        : window.__NEXT_DATA__.props.initialProps;
      const { locale, intlMessages } = requestProps;
      const now = Date.now();

      return { ...props, locale, intlMessages, now };
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
