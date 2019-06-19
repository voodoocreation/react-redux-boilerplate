import { failure, success } from "../../models/root.models";
import { TRequest } from "../configureHttpClient";

interface IResponse {
  serverTest: boolean;
}

export const fetchApiData = (request: TRequest) => async () => {
  try {
    const response: IResponse = await request({ url: "/example" });

    return success(response);
  } catch (error) {
    return failure(error.message);
  }
};
