// Route-specific translations for auth/log-in component
// This file will be bundled ONLY with the log-in component

export const loginTranslations = {
  en: {
    auth: {
      login: {
        title: "Welcome Back",
        button: "Sign In",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        welcome: "Hello, {0}!",
        error: "Invalid credentials"
      }
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Operation completed"
    }
  },
  vi: {
    auth: {
      login: {
        title: "Chào mừng trở lại",
        button: "Đăng nhập",
        emailPlaceholder: "Nhập email của bạn",
        passwordPlaceholder: "Nhập mật khẩu của bạn",
        welcome: "Xin chào, {0}!",
        error: "Thông tin đăng nhập không hợp lệ"
      }
    },
    common: {
      loading: "Đang tải...",
      error: "Đã xảy ra lỗi",
      success: "Thao tác hoàn thành"
    }
  }
}

// Route-specific registration function for login only
export function registerLoginTranslations(i18nInstance) {
  const globalInstance = i18nInstance.global || i18nInstance
  
  if (globalInstance && globalInstance.setLocaleMessage) {
    Object.keys(loginTranslations).forEach(locale => {
      const existing = globalInstance.getLocaleMessage(locale) || {}
      const newMessages = {
        ...existing,
        ...loginTranslations[locale]
      }
      globalInstance.setLocaleMessage(locale, newMessages)
      console.log(`[I18N] Registered login route translations for '${locale}':`, Object.keys(loginTranslations[locale]))
    })
    console.log('[I18N] Login route translations registered')
  } else {
    console.warn('[I18N] Invalid i18n instance provided to registerLoginTranslations', i18nInstance)
  }
}