import { IStoreState } from "../reducers/root.reducers";

export const getApiData = (state: IStoreState) => state.example.apiData;

export const getLocalData = (state: IStoreState) => state.example.localData;
