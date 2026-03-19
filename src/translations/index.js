import { es } from './es';
import { en } from './en';

export const translations = {
  es,
  en
};

export const useTranslation = (language) => {
  return {
    t: (key) => {
      const keys = key.split('.');
      let translation = translations[language];
      
      for (const k of keys) {
        if (translation && translation[k]) {
          translation = translation[k];
        } else {
          return key; // Fallback al key si no existe la traducción
        }
      }
      
      return translation;
    }
  };
};
