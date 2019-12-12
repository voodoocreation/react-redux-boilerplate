import * as React from "react";

import { failure } from "../models/root.models";
import { mockWithFailure } from "./mocks";
import WrapperWithRedux from "./WrapperWithRedux";

const Dummy: React.FC = () => <div className="Dummy" />;

describe("[utilities] WrapperWithRedux", () => {
  describe("when using the ports API", () => {
    const component = new WrapperWithRedux(Dummy).withDefaultPorts({
      api: {
        fetchApiData: mockWithFailure("Default port")
      } as any
    });

    it("mounts with default ports correctly", async () => {
      component.mount();

      expect(await component.ports.api.fetchApiData()).toEqual(
        failure("Default port")
      );
    });

    it("mounts with test-specific ports correctly", async () => {
      component
        .withPorts({
          api: {
            fetchApiData: mockWithFailure("Test port")
          }
        })
        .mount();

      expect(await component.ports.api.fetchApiData()).toEqual(
        failure("Test port")
      );
    });

    it("clears test-specific ports after previous test and uses default ports again", async () => {
      component.mount();

      expect(await component.ports.api.fetchApiData()).toEqual(
        failure("Default port")
      );
    });
  });
});
