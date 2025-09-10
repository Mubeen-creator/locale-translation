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
export function registerProfileTranslations(i18nInstance) {
  if (i18nInstance && i18nInstance.global) {
    Object.keys(profileTranslations).forEach(locale => {
      const existing = i18nInstance.global.getLocaleMessage(locale) || {}
      i18nInstance.global.setLocaleMessage(locale, {
        ...existing,
        ...profileTranslations[locale]
      })
    })
    console.log('[I18N] Profile section translations registered')
  }
}