import { mount } from "enzyme";
import * as React from "react";
import { IntlProvider } from "react-intl";

import * as messages from "../locales/en-NZ";
import injectIntlIntoPage from "./injectIntlIntoPage";

describe("[helpers] injectIntlIntoPage", () => {
  describe("when `getInitialProps` is defined", () => {
    let wrapper: any;
    let initialProps: any;
    const test = "From getInitialProps()";

    class WithInitialProps extends React.Component<{ test: string }> {
      public static defaultProps = { test: "From defaultProps" };

      public static async getInitialProps() {
        return { test };
      }

      public render() {
        return <div>{this.props.test}</div>;
      }
    }

    it("wraps component correctly", async () => {
      const WithInitialPropsWrapped = injectIntlIntoPage(WithInitialProps);

      initialProps = await WithInitialPropsWrapped.getInitialProps({} as any);
      wrapper = mount(
        <IntlProvider
          defaultLocale="en-NZ"
          locale="en-NZ"
          messages={messages}
          textComponent={React.Fragment}
        >
          <WithInitialPropsWrapped {...initialProps} />
        </IntlProvider>
      );
    });

    it("defines initialProps correctly", () => {
      expect(initialProps).toEqual({ test });
    });

    it("renders wrapped component correctly", () => {
      expect(wrapper.render().html()).toBe(test);
    });
  });

  describe("when `getInitialProps` isn't defined", () => {
    let wrapper: any;
    let initialProps: any;
    const test = "From getInitialProps()";

    // tslint:disable-next-line
    class WithoutInitialProps extends React.Component<{ test: string }> {
      public static defaultProps = { test };

      public render() {
        return <div>{this.props.test}</div>;
      }
    }

    it("wraps component correctly", async () => {
      const WithoutInitialPropsWrapped = injectIntlIntoPage(
        WithoutInitialProps
      );

      initialProps = await WithoutInitialPropsWrapped.getInitialProps(
        {} as any
      );
      wrapper = mount(
        <IntlProvider
          defaultLocale="en-NZ"
          locale="en-NZ"
          messages={messages}
          textComponent={React.Fragment}
        >
          <WithoutInitialPropsWrapped {...initialProps} />
        </IntlProvider>
      );
    });

    it("defines initialProps correctly", () => {
      expect(initialProps).toEqual({});
    });

    it("renders wrapped component correctly", () => {
      expect(wrapper.render().html()).toBe(test);
    });
  });
});
