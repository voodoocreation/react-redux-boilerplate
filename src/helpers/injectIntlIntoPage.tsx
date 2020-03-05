import { NextComponentType } from "next";
import * as React from "react";
import { injectIntl } from "react-intl";

import { IPageContext } from "../components/connected/App/App";

export default <T extends NextComponentType<IPageContext, any, any>>(
  Component: T
) => {
  const IntlPage = injectIntl(Component);

  class ComponentWithIntl extends React.Component<{}> {
    public static getInitialProps = async (context: IPageContext) => {
      let props;

      if (typeof Component.getInitialProps === "function") {
        props = await Component.getInitialProps(context);
      }

      return { ...props };
    };

    public render() {
      return <IntlPage {...this.props} />;
    }
  }

  return ComponentWithIntl;
};
