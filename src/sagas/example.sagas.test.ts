import setupSagas from "../helpers/setupSagas";

import * as actions from "../actions/root.actions";

describe("[sagas] Example", () => {
  describe("takeLatest(actions.fetchApiData.started)", () => {
    it("put(actions.fetchApiData.done)", async () => {
      const testData = { serverTest: true };

      const { dispatch, store } = setupSagas(
        {},
        {
          api: {
            fetchApiData: () => ({
              data: testData,
              ok: true
            })
          }
        }
      );

      dispatch(actions.fetchApiData.started({}));

      expect(store().example.apiData).toEqual(testData);
    });

    it("put(actions.fetchApiData.failed)", async () => {
      const { dispatch, findAction } = setupSagas(
        {},
        {
          api: {
            fetchApiData: () => ({
              message: "Bad Request",
              ok: false
            })
          }
        }
      );

      dispatch(actions.fetchApiData.started({}));

      const failureAction = findAction(actions.fetchApiData.failed);
      expect(failureAction.payload.error).toBe("Bad Request");
    });
  });
});
