import actionCreatorFactory from "typescript-fsa";

const createAction = actionCreatorFactory("APP");

export const initApp = createAction.async<{ locale?: string }, {}>("INIT");

export const setCurrentRoute = createAction<string>("SET_CURRENT_ROUTE");

export const changeRoute = createAction.async<string, {}>("CHANGE_ROUTE");
