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
      dynamicImports: [],
      files: [],
      isServer: true,
      renderPage: async () => ({}),
      req: {
        intlMessages: {},
        locale: "en-NZ"
      }
    },
    fromTestProps
  );
  const initialProps = await Document.getInitialProps(documentProps);
  const props = {
    ...documentProps,
    ...initialProps
  };

  return {
    props,
    wrapper: fn(<Document {...props} />)
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
    const { wrapper } = await setup(render);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders currectly when NODE_ENV=production", async () => {
    process.env.NODE_ENV = "production";
    const { wrapper } = await setup(render);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders currectly when locale is missing", async () => {
    const { wrapper } = await setup(render, {
      req: { locale: "" }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
