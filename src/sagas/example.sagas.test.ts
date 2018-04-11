import setupSagas from "../helpers/setupSagas";

import * as actions from "../actions/root.actions";

describe(`${actions.fetchApiData.started}`, () => {
  it(`with ${actions.fetchApiData.done}`, async () => {
    const testData = { serverTest: true };

    const { dispatch, store } = setupSagas(
      {},
      {
        fetchApiData: () => ({
          data: testData,
          ok: true
        })
      }
    );

    dispatch(actions.fetchApiData.started({}));

    const storeResult = store().example.apiData;

    expect(storeResult).toEqual(testData);
  });

  it(`with ${actions.fetchApiData.failed}`, async () => {
    const { dispatch, findAction } = setupSagas(
      {},
      {
        fetchApiData: () => ({
          message: "Bad Request",
          ok: false
        })
      }
    );

    dispatch(actions.fetchApiData.started({}));

    const failureAction = findAction(actions.fetchApiData.failed);

    expect(failureAction.payload.error).toBe("Bad Request");
  });
});
