// ─────────────────────────────────────────────────────────────────────────────
//  src/i18n.js  –  Internationalization setup
//  Detects device language and falls back to English.
// ─────────────────────────────────────────────────────────────────────────────

import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '../locales/en.json';
import es from '../locales/es.json';

const i18n = new I18n({ en, es });

// Use first device locale, fall back to English
i18n.locale         = getLocales()[0]?.languageCode ?? 'en';
i18n.enableFallback = true;
i18n.defaultLocale  = 'en';

export default i18n;
