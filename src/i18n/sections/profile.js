// Section-specific translations for profile
// This file will be bundled with the profile section components

import enLocale from '../locales/en.json'
import viLocale from '../locales/vi.json'

export const profileTranslations = {
  en: {
    profile: enLocale.profile,
    common: enLocale.common
  },
  vi: {
    profile: viLocale.profile,
    common: viLocale.common
  }
}

// Auto-register translations when this module is imported
export function registerProfileTranslations(i18n) {
  if (i18n && i18n.global) {
    // Merge translations into existing locale messages
    Object.keys(profileTranslations).forEach(locale => {
      const existing = i18n.global.getLocaleMessage(locale) || {}
      i18n.global.setLocaleMessage(locale, {
        ...existing,
        ...profileTranslations[locale]
      })
    })
    console.log('[I18N] Profile section translations registered')
  }
}