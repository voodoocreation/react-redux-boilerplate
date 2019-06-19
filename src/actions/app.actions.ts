import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("APP");

export const setCurrentRoute = actionCreator<string>("SET_CURRENT_ROUTE");

export const changeRoute = actionCreator.async<string, null>("CHANGE_ROUTE");
