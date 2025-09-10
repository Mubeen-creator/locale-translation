// Section-specific translations for shop
// This file will be bundled with the shop section components

import enLocale from '../locales/en.json'
import viLocale from '../locales/vi.json'

export const shopTranslations = {
  en: {
    shop: enLocale.shop,
    common: enLocale.common
  },
  vi: {
    shop: viLocale.shop,
    common: viLocale.common
  }
}

// Auto-register translations when this module is imported
export function registerShopTranslations(i18n) {
  if (i18n && i18n.global) {
    // Merge translations into existing locale messages
    Object.keys(shopTranslations).forEach(locale => {
      const existing = i18n.global.getLocaleMessage(locale) || {}
      i18n.global.setLocaleMessage(locale, {
        ...existing,
        ...shopTranslations[locale]
      })
    })
    console.log('[I18N] Shop section translations registered')
  }
}