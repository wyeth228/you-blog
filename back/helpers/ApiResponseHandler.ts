interface IApiErrorResponse {
  code: number;
  message: string;
}

interface IApiErrorLangs {
  ru: string;
  en: string;
}

interface IApiErrorTranslation {
  [name: string]: IApiErrorLangs;
}

interface IApiRedirectResponse {
  code: number;
  redirect_url: string;
}

function createApiErrorTranslations<T extends IApiErrorTranslation>(
  translations: T
): Readonly<Record<keyof T, IApiErrorLangs>> {
  return translations;
}

export type ApiErrorTypes = keyof typeof apiErrorTranslations;

export class ApiResponseHandler {
  genErrorData(
    statusCode: number,
    errorType: ApiErrorTypes,
    lang: keyof IApiErrorLangs
  ): IApiErrorResponse {
    return {
      code: statusCode,
      message: apiErrorTranslations[errorType][lang] || "No info",
    };
  }

  genRedirectData(
    statusCode: number,
    redirectUrl: string
  ): IApiRedirectResponse {
    return {
      code: statusCode,
      redirect_url: redirectUrl,
    };
  }
}

const apiErrorTranslations = createApiErrorTranslations({
  "email-ocuppied": {
    ru: "E-mail уже занят",
    en: "E-Mail is already in use",
  },
  "email-invalid": {
    ru: "E-mail введен не верно",
    en: "The e-mail was entered incorrectly",
  },
  "username-invalid": {
    ru: "Недопустимый никнейм",
    en: "Invalid user name",
  },
  "password-invalid": {
    ru: "Ненадежный пароль",
    en: "Unreliable password",
  },
  "server-error": {
    ru: "Ошибка сервера",
    en: "Server error",
  },
  "user-not-found": {
    ru: "Пользователь не найден",
    en: "User not found",
  },
  "user-already-exists": {
    ru: "Пользователь уже существует",
    en: "The user already exists",
  },
  "wrong-vk-access-data": {
    ru: "Неверные данные доступа ВКонтакте",
    en: "Incorrect VKontakte access data",
  },
  "wrong-vk-redirect-url": {
    ru: "Неправильный URL редиректа для ВКонтакте",
    en: "Incorrect redirect URL for VKontakte",
  },
  "wrong-vk-code-or-url": {
    ru: "Неправильные код или URL для ВКонтакте",
    en: "Incorrect code or URL for VKontakte",
  },
  "wrong-google-access-data": {
    ru: "Неверные данные доступа Google",
    en: "Incorrect Google access data",
  },
  "wrong-google-redirect-url": {
    ru: "Неправильный URL редиректа для Google",
    en: "Incorrect redirect URL for Google",
  },
  "wrong-google-code-or-url": {
    ru: "Неправильные код или URL для Google",
    en: "Incorrect code or URL for Google",
  },
  "wrong-email-or-password": {
    ru: "Неверная почта или пароль",
    en: "Invalid email or password",
  },
});
