// Section-specific translations for dashboard
// This file will be bundled with the dashboard section components

import enLocale from '../locales/en.json'
import viLocale from '../locales/vi.json'

export const dashboardTranslations = {
  en: {
    dashboard: enLocale.dashboard,
    common: enLocale.common
  },
  vi: {
    dashboard: viLocale.dashboard,
    common: viLocale.common
  }
}

// Auto-register translations when this module is imported
export function registerDashboardTranslations(i18n) {
  if (i18n && i18n.global) {
    // Merge translations into existing locale messages
    Object.keys(dashboardTranslations).forEach(locale => {
      const existing = i18n.global.getLocaleMessage(locale) || {}
      i18n.global.setLocaleMessage(locale, {
        ...existing,
        ...dashboardTranslations[locale]
      })
    })
    console.log('[I18N] Dashboard section translations registered')
  }
}