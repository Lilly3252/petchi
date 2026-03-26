import i18next from "i18next";

export function generateLocalizedChoices<T extends Record<string, string>>(
  enumObj: T,
  i18nKey: string,
) {
  return (Object.values(enumObj) as T[keyof T][]).map((value) => ({
    name: i18next.t(`${i18nKey}.${value}`, { lng: "en" }),
    name_localizations: {
      fr: i18next.t(`${i18nKey}.${value}`, { lng: "fr" }),
      ja: i18next.t(`${i18nKey}.${value}`, { lng: "ja" }),
    },
    value,
  }));
}
