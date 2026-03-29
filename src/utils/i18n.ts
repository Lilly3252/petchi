import i18next from "i18next";
import { Backend } from "@skyra/i18next-backend";

export async function initI18n() {
  await i18next.use(Backend).init({
    backend: {
      paths: [new URL("../../locales/{{lng}}/{{ns}}.json", import.meta.url)],
    },
    cleanCode: true,
    lng: "en-US",
    preload: ["en-US", "fr", "ja"],
    supportedLngs: ["en-US", "fr", "ja"],
    fallbackLng: ["en-US"],
    returnNull: false,
    returnEmptyString: false,
    debug: false,
    simplifyPluralSuffix: false,
    nonExplicitSupportedLngs: false,
  });
  //console.log(generateLocalizedChoices(MedicineType, "shop.medicine"));
}

console.log("🌐 i18next initialized");
//console.log(new URL("../../locales/{{lng}}/{{ns}}.json", import.meta.url))

export default i18next;
