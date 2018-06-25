import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("PAGE");

export const changeRoute = actionCreator.async<
  PLChangeRouteStarted,
  PLChangeRouteDone,
  PLChangeRouteFailed
>("CHANGE_ROUTE");
