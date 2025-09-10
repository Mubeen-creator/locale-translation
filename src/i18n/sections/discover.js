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
export function registerDiscoverTranslations(i18nInstance) {
  if (i18nInstance && i18nInstance.global) {
    Object.keys(discoverTranslations).forEach(locale => {
      const existing = i18nInstance.global.getLocaleMessage(locale) || {}
      i18nInstance.global.setLocaleMessage(locale, {
        ...existing,
        ...discoverTranslations[locale]
      })
    })
    console.log('[I18N] Discover section translations registered')
  }
}