import { createReduxAction, createSignalAction } from '../helpers/actionCreators';

const NAME = 'EXAMPLE';
const reduxAction = createReduxAction(NAME);
const signalAction = createSignalAction(NAME);

export const fetchApiData = signalAction('FETCH');
export const setLocalData = reduxAction('SETTER');
