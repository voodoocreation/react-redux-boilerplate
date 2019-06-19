import { mount } from "enzyme";
import * as React from "react";

import injectIntlIntoPage from "./injectIntlIntoPage";

describe("[helpers] injectIntlIntoPage", () => {
  describe("when `getInitialProps` is defined", () => {
    let actual: any;
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
      actual = mount(<WithInitialPropsWrapped {...initialProps} />);
    });

    it("defines initialProps correctly", () => {
      expect(initialProps).toEqual({ test });
    });

    it("renders wrapped component correctly", () => {
      expect(actual.render().html()).toBe(test);
    });
  });

  describe("when `getInitialProps` isn't defined", () => {
    let actual: any;
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
      actual = mount(<WithoutInitialPropsWrapped {...initialProps} />);
    });

    it("defines initialProps correctly", () => {
      expect(initialProps).toEqual({});
    });

    it("renders wrapped component correctly", () => {
      expect(actual.render().html()).toBe(test);
    });
  });
});
