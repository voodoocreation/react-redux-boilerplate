import { render } from "enzyme";
import merge from "lodash.merge";
import * as React from "react";

import Document from "./Document";

const setup = async (fromTestProps?: any) => {
  const context = merge(
    {
      __NEXT_DATA__: {
        buildId: "buildId",
        page: "/",
        pathname: "pathname"
      },
      assetPrefix: "/assetPrefix",
      dynamicImports: [],
      files: [],
      isServer: true,
      renderPage: async () => ({}),
      req: {
        locale: "en-NZ"
      }
    },
    fromTestProps
  );
  const initialProps = await Document.getInitialProps(context);
  const props = {
    ...context,
    ...initialProps
  };

  return {
    props,
    wrapper: render(<Document {...props} />)
  };
};

describe("[connected] <Document />", () => {
  beforeEach(() => {
    // @ts-ignore-next-line
    process.env.NODE_ENV = "development";

    Object.defineProperty(window, "isServer", {
      value: true,
      writable: true
    });

    Object.defineProperty(Date, "now", {
      value: () => "NOW"
    });
  });

  it("renders correctly when NODE_ENV=development", async () => {
    // @ts-ignore-next-line
    process.env.NODE_ENV = "development";

    expect(async () => {
      await setup();
    }).not.toThrowError();
  });

  it("renders correctly when NODE_ENV=production", async () => {
    // @ts-ignore-next-line
    process.env.NODE_ENV = "production";

    expect(async () => {
      await setup();
    }).not.toThrowError();
  });

  it("renders correctly when locale is missing", async () => {
    expect(async () => {
      await setup({
        req: { locale: "" }
      });
    }).not.toThrowError();
  });
});
