import { mount } from "enzyme";
import * as React from "react";

import injectIntlIntoPage from "./injectIntlIntoPage";

describe("[helpers] injectIntl", () => {
  it("injects intl into next.js page component correctly when `getInitialProps` is defined", async () => {
    class WithInitialProps extends React.Component<{ test: string }> {
      public static defaultProps = { test: "From defaultProps" };

      public static async getInitialProps() {
        return { test: "From getInitialProps()" };
      }

      public render() {
        return <div>{this.props.test}</div>;
      }
    }

    const WithInitialPropsWrapped = injectIntlIntoPage(WithInitialProps);
    const initialProps = await WithInitialPropsWrapped.getInitialProps({});
    const actual = mount(<WithInitialPropsWrapped {...initialProps} />);

    expect(initialProps).toEqual({ test: "From getInitialProps()" });
    expect(actual.render()).toMatchSnapshot();
  });

  it("injects intl into next.js page component correctly when `getInitialProps` isn't defined", async () => {
    // tslint:disable-next-line
    class WithoutInitialProps extends React.Component<{ test: string }> {
      public static defaultProps = { test: "From defaultProps" };

      public render() {
        return <div>{this.props.test}</div>;
      }
    }

    const WithoutInitialPropsWrapped = injectIntlIntoPage(WithoutInitialProps);
    const initialProps = await WithoutInitialPropsWrapped.getInitialProps({});
    const actual = mount(<WithoutInitialPropsWrapped {...initialProps} />);

    expect(initialProps).toEqual({});
    expect(actual.render()).toMatchSnapshot();
  });
});
