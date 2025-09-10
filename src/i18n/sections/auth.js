// Section-specific translations for auth
// This file will be bundled with the auth section components

import enLocale from '../locales/en.json'
import viLocale from '../locales/vi.json'

export const authTranslations = {
  en: {
    auth: enLocale.auth,
    common: enLocale.common
  },
  vi: {
    auth: viLocale.auth,
    common: viLocale.common
  }
}

// Auto-register translations when this module is imported
export function registerAuthTranslations(i18n) {
  if (i18n && i18n.global) {
    // Merge translations into existing locale messages
    Object.keys(authTranslations).forEach(locale => {
      const existing = i18n.global.getLocaleMessage(locale) || {}
      i18n.global.setLocaleMessage(locale, {
        ...existing,
        ...authTranslations[locale]
      })
    })
    console.log('[I18N] Auth section translations registered')
  }
}