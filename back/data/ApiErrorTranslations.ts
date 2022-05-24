export interface IApiErrorLangs {
  ru: string;
  en: string;
}

function createApiErrorTranslations<
  T extends { [name: string]: IApiErrorLangs }
>(translations: T): Readonly<Record<keyof T, IApiErrorLangs>> {
  return translations;
}

export const ApiErrorTranslations = createApiErrorTranslations({
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
});

export type ApiErrorTypes = keyof typeof ApiErrorTranslations;
