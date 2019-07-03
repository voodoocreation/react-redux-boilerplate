import { TStoreState } from "../reducers/root.reducers";

export const getApiData = (state: TStoreState) => state.example.apiData;

export const getLocalData = (state: TStoreState) => state.example.localData;
