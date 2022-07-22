import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/Language.json';
import translationFR from './locales/fr/Language.json';
import translationAR from "./locales/ar/Language.json";

let Language = require("../language/enums/Language.json");
let defaultLanguage = Language.FR;

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    },
    ar: {
        translation: translationAR
    }
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: defaultLanguage,

        keySeparator: ".",  // to support nested translations

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18n;