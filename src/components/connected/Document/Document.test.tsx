import { render } from "enzyme";
import merge from "lodash.merge";
import * as React from "react";

import Document from "./Document";

const setup = async (fn: any, fromTestProps?: any) => {
  const documentProps = merge(
    {
      __NEXT_DATA__: {
        buildId: "buildId",
        page: "/",
        pathname: "pathname"
      },
      assetPrefix: "/assetPrefix",
      ctx: {
        isServer: true,
        renderPage: async () => ({}),
        req: {
          intlMessages: {},
          locale: "en-NZ"
        }
      },
      dynamicImports: [],
      files: []
    },
    fromTestProps
  );
  const initialProps = await Document.getInitialProps(documentProps.ctx);
  const props = {
    ...documentProps,
    ...initialProps
  };

  return {
    actual: fn(<Document {...props} />),
    props
  };
};

const g: any = global;

describe("[connected] <Document />", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    g.isServer = true;
  });

  it("renders correctly when NODE_ENV=development", async () => {
    process.env.NODE_ENV = "development";
    const { actual } = await setup(render);

    expect(actual).toMatchSnapshot();
  });

  it("renders currectly when NODE_ENV=production", async () => {
    process.env.NODE_ENV = "production";
    const { actual } = await setup(render);

    expect(actual).toMatchSnapshot();
  });
});
