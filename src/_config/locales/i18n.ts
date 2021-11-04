import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as localesFR from "./fr"

export const resources = {
    fr: { ...localesFR },
}
export const defaultNS = "common"

i18n.use(initReactI18next).init({
    resources,
    ns: [ "common", "errors" ],
    defaultNS,

    fallbackLng: "fr",
    debug: process.env.NODE_ENV === "development",
    returnObjects: true,
    interpolation: {
        escapeValue: false,
    },
})

export default i18n