import {
  IApiErrorLangs,
  ApiErrorTranslations,
  ApiErrorTypes,
} from "../data/ApiErrorTranslations";

interface IApiErrorResponse {
  code: number;
  message: string;
}

export default class ApiErrorsHandler {
  genErrorData(
    statusCode: number,
    errorType: ApiErrorTypes,
    lang: keyof IApiErrorLangs
  ): IApiErrorResponse {
    return {
      code: statusCode,
      message: ApiErrorTranslations[errorType][lang] || "No info",
    };
  }
}
