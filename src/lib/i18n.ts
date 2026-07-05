import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en.json';
import hiTranslation from '../locales/hi.json';

// Namespaces for translation
const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  }
};

i18n
  // Detects the user's browser language
  .use(LanguageDetector)
  // Passes i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    
    // We can uncomment this for debugging later if needed
    // debug: true,

    interpolation: {
      escapeValue: false, // React already escapes values by default
    }
  });

export default i18n;
