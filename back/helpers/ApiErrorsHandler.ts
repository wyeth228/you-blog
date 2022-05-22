import {
  ApiErrorTranslations,
  ApiErrorTypes,
} from "../data/ApiErrorTranslations";

interface IApiErrorResponse {
  code: number;
  message: string;
}

export default class ApiErrorsHandler {
  static genErrorData(
    statusCode: number,
    errorType: ApiErrorTypes
  ): IApiErrorResponse {
    return {
      code: statusCode,
      message: ApiErrorTranslations[errorType]["ru"],
    };
  }
}
