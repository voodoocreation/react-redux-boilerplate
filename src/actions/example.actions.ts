import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("EXAMPLE");

export const fetchApiData = actionCreator.async<{}, {}>("FETCH");
export const setLocalData = actionCreator<PLSetLocalData>("SETTER");
