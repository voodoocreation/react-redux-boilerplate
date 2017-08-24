import setupSagas from '../__mocks__/setupSagas';

import * as actions from '../actions/root.actions';

it(`${actions.fetchApiData.request} with ${actions.fetchApiData.success}`, async () => {
  const testData = { serverTest: true };

  const { dispatch, store } = setupSagas(
    {},
    { fetchApiData: () => testData },
  );

  dispatch(actions.fetchApiData.request());

  const storeResult = store().example.apiData;

  expect(storeResult).toEqual(testData);
});

it(`${actions.fetchApiData.request} with ${actions.fetchApiData.failure}`, async () => {
  const { dispatch, findAction } = setupSagas(
    {},
    {
      fetchApiData: () => { throw new Error('Bad Request'); },
    },
  );

  dispatch(actions.fetchApiData.request());

  const failureAction = findAction(actions.fetchApiData.failure);

  expect(failureAction.payload).toBe('Bad Request');
});
