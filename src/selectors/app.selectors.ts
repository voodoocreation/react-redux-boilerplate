import { TStoreState } from "../reducers/root.reducers";

export const getCurrentRoute = (state: TStoreState) => state.app.currentRoute;

export const getAppError = (state: TStoreState) => state.app.error;

export const isAppLoading = (state: TStoreState) => state.app.isLoading;
