import ComponentTester from "../../../utilities/ComponentTester";

import ConnectedErrorPage from "./ConnectedErrorPage";

const component = new ComponentTester(
  ConnectedErrorPage,
  true
).withDefaultReduxState({
  app: {
    error: {
      message: "Not found",
      status: 404
    }
  }
});

describe("[connected] <ConnectedErrorPage />", () => {
  it("renders ErrorPage correctly with error from the store", () => {
    const { wrapper } = component.mount();

    expect(wrapper.find("ErrorPage").props()).toMatchObject({
      message: "Not found",
      status: 404
    });
  });
});
