import ComponentTester from "../../../utilities/ComponentTester";

import * as actions from "../../../actions/root.actions";
import { mockWithSuccess } from "../../../utilities/mocks";
import IndexRoute from "./IndexRoute";

const component = new ComponentTester(IndexRoute, true).withDefaultPorts({
  api: {
    fetchApiData: mockWithSuccess({ apiData: true })
  }
});

describe("<IndexRoute />", () => {
  describe("when interacting with the controls", () => {
    const { wrapper } = component.mount();

    it("renders initial API data section correctly", () => {
      expect(wrapper.find(".Index--apiData pre").text()).toBe("{}");
    });

    it("renders initial local data section correctly", () => {
      expect(wrapper.find(".Index--localData pre").text()).toContain(
        `"inputValue": ""`
      );
    });

    it("clicks the fetch button", () => {
      wrapper.find(".Index--apiData--fetchButton").simulate("click");
    });

    it("dispatches actions.fetchApiData.started", () => {
      expect(
        component.reduxHistory.filter(actions.fetchApiData.started.match)
      ).toHaveLength(1);
    });

    it("renders the fetched data correctly", () => {
      expect(wrapper.find(".Index--apiData pre").text()).toContain(
        `"apiData": true`
      );
    });

    it("inputs a new value into the text input", () => {
      wrapper.find("input").simulate("change", { target: { value: "Test" } });
    });

    it("renders the input data correctly", () => {
      expect(wrapper.find(".Index--localData pre").text()).toContain(
        `"inputValue": "Test"`
      );
    });

    it("matches snapshot", () => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
