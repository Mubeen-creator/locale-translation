// Section-specific translations for auth
// This file will be bundled with the auth section components

// Inline translations to prevent separate chunks
export const authTranslations = {
  en: {
    auth: {
      login: {
        title: "Welcome Back",
        button: "Sign In",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        welcome: "Hello, {0}!",
        error: "Invalid credentials"
      },
      register: {
        title: "Create Account",
        button: "Sign Up",
        firstName: "First Name",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        success: "Account created successfully",
        Onboarding: {
          title: "Complete Your Profile",
          description: "Please complete your profile information",
          button: "Complete"
        },
        KYC: {
          title: "Identity Verification",
          description: "Please complete the identity verification process to continue",
          button: "Complete KYC",
          error: "An error occurred while completing KYC",
          status: {
            title: "KYC Status",
            description: "Your identity verification status",
            done: "DONE",
            pending: "PENDING"
          }
        }
      },
      common: {
        logout: "Sign Out",
        loading: "Loading...",
        user: "User",
        admin: "Admin",
        guest: "Guest"
      },
      messages: {
        Onboarding: {
          error: "An error occurred while completing your profile"
        }
      }
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Operation completed",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      update: "Update",
      submit: "Submit",
      reset: "Reset",
      back: "Go Back",
      next: "Next",
      previous: "Previous"
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
      },
      register: {
        title: "Tạo tài khoản",
        button: "Đăng ký",
        firstName: "Tên",
        emailPlaceholder: "Nhập email của bạn",
        passwordPlaceholder: "Nhập mật khẩu của bạn",
        success: "Tạo tài khoản thành công",
        Onboarding: {
          title: "Hoàn thiện hồ sơ",
          description: "Vui lòng hoàn thiện thông tin hồ sơ của bạn",
          button: "Hoàn thành"
        },
        KYC: {
          title: "Xác minh danh tính",
          description: "Vui lòng hoàn thành quy trình xác minh danh tính để tiếp tục",
          button: "Hoàn thành KYC",
          error: "Có lỗi xảy ra khi hoàn thành KYC",
          status: {
            title: "Trạng thái KYC",
            description: "Trạng thái xác minh danh tính của bạn",
            done: "HOÀN THÀNH",
            pending: "CHỜ XỬ LÝ"
          }
        }
      },
      common: {
        logout: "Đăng xuất",
        loading: "Đang tải...",
        user: "Người dùng",
        admin: "Quản trị viên",
        guest: "Khách"
      },
      messages: {
        Onboarding: {
          error: "Có lỗi xảy ra khi hoàn thiện hồ sơ"
        }
      }
    },
    common: {
      loading: "Đang tải...",
      error: "Đã xảy ra lỗi",
      success: "Thao tác hoàn thành",
      save: "Lưu",
      cancel: "Hủy",
      delete: "Xóa",
      edit: "Sửa",
      create: "Tạo",
      update: "Cập nhật",
      submit: "Gửi",
      reset: "Đặt lại",
      back: "Quay lại",
      next: "Tiếp theo",
      previous: "Trước đó"
    }
  }
}

// Auto-register translations when this module is imported
export function registerAuthTranslations(i18nInstance) {
  // Handle both global instance and composable instance
  const globalInstance = i18nInstance.global || i18nInstance
  
  if (globalInstance && globalInstance.setLocaleMessage) {
    // Merge translations into existing locale messages
    Object.keys(authTranslations).forEach(locale => {
      const existing = globalInstance.getLocaleMessage(locale) || {}
      const newMessages = {
        ...existing,
        ...authTranslations[locale]
      }
      globalInstance.setLocaleMessage(locale, newMessages)
      console.log(`[I18N] Registered auth translations for '${locale}':`, Object.keys(authTranslations[locale]))
    })
    console.log('[I18N] Auth section translations registered')
    console.log('[I18N] Available locales:', globalInstance.availableLocales)
    console.log('[I18N] Current locale:', globalInstance.locale?.value || globalInstance.locale)
    
    // Test a translation
    setTimeout(() => {
      const testKey = 'auth.login.title'
      const translated = globalInstance.t ? globalInstance.t(testKey) : 'No t function'
      console.log(`[I18N] Test translation '${testKey}':`, translated)
    }, 100)
  } else {
    console.warn('[I18N] Invalid i18n instance provided to registerAuthTranslations', i18nInstance)
  }
}