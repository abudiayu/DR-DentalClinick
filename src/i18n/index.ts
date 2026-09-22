import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import am from './locales/am.json'
import ar from './locales/ar.json'
import om from './locales/om.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      ar: { translation: ar },
      om: { translation: om },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'am', 'ar', 'om'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n;
