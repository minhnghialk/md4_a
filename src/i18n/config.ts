import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Translate Text
import en from './translations/en'
import vi from './translations/vi'
import jp from './translations/jp'

function setLocalLanguage(): string {
  // eslint-disable-next-line prefer-const
  let locales = localStorage.getItem('locales')
  return locales ? locales : 'en';
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  // lng: 'vi',
  lng: setLocalLanguage(),
  fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
      jp: {
        translation: jp,
      },
    },
});

export default i18n