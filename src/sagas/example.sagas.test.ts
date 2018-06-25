import setupSagas from "../helpers/setupSagas";

import * as actions from "../actions/root.actions";

describe(`${actions.fetchApiData.started}`, () => {
  it(`with ${actions.fetchApiData.done}`, async () => {
    const testData = { serverTest: true };

    const { dispatch, findAction } = setupSagas(
      {},
      {
        fetchApiData: () => ({
          data: testData,
          ok: true
        })
      }
    );

    dispatch(actions.fetchApiData.started({}));

    const doneAction = findAction(actions.fetchApiData.done);
    expect(doneAction.payload.result).toEqual(testData);
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
