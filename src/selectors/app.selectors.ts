import { IStoreState } from "../reducers/root.reducers";

export const getCurrentRoute = (state: IStoreState) => state.app.currentRoute;

export const getAppError = (state: IStoreState) => state.app.error;

export const isAppLoading = (state: IStoreState) => state.app.isLoading;
