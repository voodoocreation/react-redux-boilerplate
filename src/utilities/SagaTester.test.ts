import merge from "ts-deepmerge";

import { failure, success } from "../models/response.models";
import { initialState } from "../reducers/root.reducers";
import { mockWithSuccess } from "./mocks";
import SagaTester from "./SagaTester";

describe("[utilities] SagaTester", () => {
  describe("when creating an instance with all parameters defined", () => {
    const testState = {
      app: {
        isLoading: true
      }
    };
    const saga = new SagaTester(testState, {
      api: {
        fetchApiData: mockWithSuccess({ test: true })
      }
    });

    it("merges the initial state with the full root initial state", () => {
      expect(saga.state).toEqual(merge(initialState, testState));
    });

    it("merges the ports with the default mocks correctly", async () => {
      expect(await saga.ports.api.fetchApiData()).toEqual(
        success({ test: true })
      );
    });
  });

  describe("when creating an instance with no parameters defined", () => {
    const saga = new SagaTester();

    it("has the full root initial state", () => {
      expect(saga.state).toEqual(initialState);
    });

    it("has default mock ports defined", async () => {
      expect(await saga.ports.api.fetchApiData()).toEqual(
        failure(`API method 'fetchApiData' not implemented in test.`)
      );
    });
  });

  describe("when using the SagaTester API", () => {
    const testAction = { type: "TEST" };
    const saga = new SagaTester();

    it("dispatches an action when the dispatch method is used", () => {
      saga.dispatch(testAction);
    });

    it("returns the list of dispatched actions when the history getter is used", () => {
      expect(saga.history).toEqual([testAction]);
    });

    describe("when the waitFor method is used", () => {
      it("waits for a future action to be dispatched before proceeding, when isFutureOnly is true", async () => {
        setTimeout(() => {
          saga.dispatch(testAction);
        }, 1);

        expect(await saga.waitFor(testAction, true)).toEqual(testAction);
      });

      it("proceeds immediately when isFutureOnly is false and the action had already been dispatched", async () => {
        expect(await saga.waitFor(testAction)).toEqual(testAction);
      });
    });
  });
});
