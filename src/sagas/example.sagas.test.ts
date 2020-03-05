import * as actions from "../actions/root.actions";
import { mockWithFailure, mockWithSuccess } from "../utilities/mocks";
import SagaTester from "../utilities/SagaTester";

describe("[sagas] Example", () => {
  describe("fetchApiDataSaga", () => {
    describe("when fetching API data, with a successful response", () => {
      const testData = { serverTest: true };

      const saga = new SagaTester(
        {},
        {
          api: {
            fetchApiData: mockWithSuccess(testData)
          }
        }
      );

      it("dispatches actions.fetchApiData.started", () => {
        saga.dispatch(actions.fetchApiData.started({}));
      });

      it("dispatches actions.fetchApiData.done with expected payload", () => {
        const matchingActions = saga.history.filter(
          actions.fetchApiData.done.match
        );

        expect(matchingActions).toHaveLength(1);
        expect(matchingActions[0].payload.result).toEqual(testData);
      });
    });

    describe("when fetching API data, with a failed response", () => {
      const saga = new SagaTester(
        {},
        {
          api: {
            fetchApiData: mockWithFailure("Server error")
          }
        }
      );

      it("dispatches actions.fetchApiData.started", () => {
        saga.dispatch(actions.fetchApiData.started({}));
      });

      it("dispatches actions.fetchApiData.failed with expected error", () => {
        const matchingActions = saga.history.filter(
          actions.fetchApiData.failed.match
        );

        expect(matchingActions).toHaveLength(1);
        expect(matchingActions[0].payload.error).toBe("Server error");
      });
    });
  });
});
