import WrapperWithRedux from "../../../utilities/WrapperWithRedux";
import ConnectedErrorPage from "./ConnectedErrorPage";

const component = new WrapperWithRedux(
  ConnectedErrorPage
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
    const wrapper = component.mount();

    expect(wrapper.find("ErrorPage").props()).toMatchObject({
      message: "Not found",
      status: 404
    });
  });
});
