import { ui, defaultLang, type SupportedLang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): SupportedLang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as SupportedLang;
  return defaultLang;
}

export function useTranslations(lang: SupportedLang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

export function getAlternateLanguageUrl(url: URL, targetLang: SupportedLang): string {
  const segments = url.pathname.split('/');
  // If first segment matches a lang, swap it
  if (segments[1] === 'es' || segments[1] === 'en') {
    segments[1] = targetLang;
    return segments.join('/') || `/${targetLang}/`;
  }
  return `/${targetLang}/`;
}
