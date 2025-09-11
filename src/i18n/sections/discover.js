// Section-specific translations for discover
// This file will be bundled with the discover section components

// Inline translations to prevent separate chunks
export const discoverTranslations = {
  en: {
    discover: {
      page: {
        title: "Discover",
        description: "Explore new content and features"
      },
      sections: {
        featured: "Featured Content"
      },
      messages: {
        explore: "Start exploring our platform"
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
    discover: {
      page: {
        title: "Khám phá",
        description: "Khám phá nội dung và tính năng mới"
      },
      sections: {
        featured: "Nội dung nổi bật"
      },
      messages: {
        explore: "Bắt đầu khám phá nền tảng của chúng tôi"
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
export function registerDiscoverTranslations(i18nInstance) {
  // Handle both global instance and composable instance
  const globalInstance = i18nInstance.global || i18nInstance
  
  if (globalInstance && globalInstance.setLocaleMessage) {
    Object.keys(discoverTranslations).forEach(locale => {
      const existing = globalInstance.getLocaleMessage(locale) || {}
      globalInstance.setLocaleMessage(locale, {
        ...existing,
        ...discoverTranslations[locale]
      })
    })
    console.log('[I18N] Discover section translations registered')
  } else {
    console.warn('[I18N] Invalid i18n instance provided to registerDiscoverTranslations', i18nInstance)
  }
}