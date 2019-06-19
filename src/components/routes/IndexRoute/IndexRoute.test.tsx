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
    const { actual } = component.mount();

    it("renders initial API data section correctly", () => {
      expect(actual.find(".Index--apiData pre").text()).toBe("{}");
    });

    it("renders initial local data section correctly", () => {
      expect(actual.find(".Index--localData pre").text()).toContain(
        `"inputValue": ""`
      );
    });

    it("clicks the fetch button", () => {
      actual.find(".Index--apiData--fetchButton").simulate("click");
    });

    it("dispatches actions.fetchApiData.started", () => {
      expect(
        component.getReduxHistory().filter(actions.fetchApiData.started.match)
      ).toHaveLength(1);
    });

    it("renders the fetched data correctly", () => {
      expect(actual.find(".Index--apiData pre").text()).toContain(
        `"apiData": true`
      );
    });

    it("inputs a new value into the text input", () => {
      actual.find("input").simulate("change", { target: { value: "Test" } });
    });

    it("renders the input data correctly", () => {
      expect(actual.find(".Index--localData pre").text()).toContain(
        `"inputValue": "Test"`
      );
    });
  });
});
