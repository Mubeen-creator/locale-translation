// Section-specific translations for discover
// This file will be bundled with the discover section components

import enLocale from '../locales/en.json'
import viLocale from '../locales/vi.json'

export const discoverTranslations = {
  en: {
    discover: enLocale.discover,
    common: enLocale.common
  },
  vi: {
    discover: viLocale.discover,
    common: viLocale.common
  }
}

// Auto-register translations when this module is imported
export function registerDiscoverTranslations(i18n) {
  if (i18n && i18n.global) {
    // Merge translations into existing locale messages
    Object.keys(discoverTranslations).forEach(locale => {
      const existing = i18n.global.getLocaleMessage(locale) || {}
      i18n.global.setLocaleMessage(locale, {
        ...existing,
        ...discoverTranslations[locale]
      })
    })
    console.log('[I18N] Discover section translations registered')
  }
}