import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("PAGE");

export const setCurrentRoute = actionCreator<PLSetCurrentRoute>("SET_CURRENT_ROUTE");
export const changeRoute = actionCreator.async<
  PLChangeRouteStarted,
  PLChangeRouteDone,
  PLChangeRouteFailed
>("CHANGE_ROUTE");
