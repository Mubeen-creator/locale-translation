// Route-specific translations for auth/sign-up component
// This file will be bundled ONLY with the sign-up component

export const signupTranslations = {
  en: {
    auth: {
      register: {
        title: "Create Account",
        button: "Sign Up",
        firstName: "First Name",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        success: "Account created successfully"
      },
      common: {
        user: "User",
        admin: "Admin",
        guest: "Guest"
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
      register: {
        title: "Tạo tài khoản",
        button: "Đăng ký",
        firstName: "Tên",
        emailPlaceholder: "Nhập email của bạn",
        passwordPlaceholder: "Nhập mật khẩu của bạn",
        success: "Tạo tài khoản thành công"
      },
      common: {
        user: "Người dùng",
        admin: "Quản trị viên",
        guest: "Khách"
      }
    },
    common: {
      loading: "Đang tải...",
      error: "Đã xảy ra lỗi",
      success: "Thao tác hoàn thành"
    }
  }
}

// Route-specific registration function for signup only
export function registerSignupTranslations(i18nInstance) {
  const globalInstance = i18nInstance.global || i18nInstance
  
  if (globalInstance && globalInstance.setLocaleMessage) {
    Object.keys(signupTranslations).forEach(locale => {
      const existing = globalInstance.getLocaleMessage(locale) || {}
      const newMessages = {
        ...existing,
        ...signupTranslations[locale]
      }
      globalInstance.setLocaleMessage(locale, newMessages)
      console.log(`[I18N] Registered signup route translations for '${locale}':`, Object.keys(signupTranslations[locale]))
    })
    console.log('[I18N] Signup route translations registered')
  } else {
    console.warn('[I18N] Invalid i18n instance provided to registerSignupTranslations', i18nInstance)
  }
}