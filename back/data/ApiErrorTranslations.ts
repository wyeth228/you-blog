export const ApiErrorTranslations = {
  "email-ocuppied": {
    ru: "E-mail уже занят",
    en: "E-Mail is already in use",
  },
  "email-invalid": {
    ru: "E-mail введен не верно",
    en: "The e-mail was entered incorrectly",
  },
};

export type ApiErrorTypes = keyof typeof ApiErrorTranslations;
