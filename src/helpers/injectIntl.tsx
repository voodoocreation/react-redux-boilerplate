import * as React from "react";
import { injectIntl } from "react-intl";

export default (Component: any) => {
  const IntlPage = injectIntl(Component);

  class ComponentWithIntl extends React.Component<{}> {
    public static async getInitialProps(initialProps: any) {
      let props;

      if (typeof Component.getInitialProps === "function") {
        props = await Component.getInitialProps(initialProps);
      }

      return { ...props };
    }

    public render() {
      return <IntlPage {...this.props} />;
    }
  }

  return ComponentWithIntl;
};