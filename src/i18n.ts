import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import pt from "./locales/pt.json";
import es from "./locales/es.json";
import cn from "./locales/cn.json";
import hi from "./locales/hi.json";

const savedLang = localStorage.getItem("app-language");
const browserLang = navigator.language.split("-")[0];

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        pt: { translation: pt },
        es: { translation: es },
        cn: { translation: cn },
        hi: { translation: hi }
    },
    lng: savedLang || browserLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;
