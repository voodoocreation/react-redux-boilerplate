import { API } from "../../constants/url.constants";
import { failure, success } from "../../models/root.models";
import { TRequest } from "../configureHttpClient";

interface IResponse {
  serverTest: boolean;
}

export const fetchApiData = (request: TRequest) => async () => {
  try {
    const response: IResponse = await request(API.EXAMPLE);

    return success(response);
  } catch (error) {
    return failure(error.message);
  }
};
