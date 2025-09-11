// Section-specific translations for profile
// This file will be bundled with the profile section components

// Inline translations to prevent separate chunks
export const profileTranslations = {
  en: {
    profile: {
      page: {
        title: "Profile",
        description: "Manage your profile information"
      },
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        bio: "Biography",
        save: "Save Changes"
      },
      messages: {
        updated: "Profile updated successfully",
        error: "Failed to update profile"
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
    profile: {
      page: {
        title: "Hồ sơ",
        description: "Quản lý thông tin hồ sơ"
      },
      form: {
        firstName: "Tên",
        lastName: "Họ",
        email: "Địa chỉ email",
        phone: "Số điện thoại",
        bio: "Tiểu sử",
        save: "Lưu thay đổi"
      },
      messages: {
        updated: "Cập nhật hồ sơ thành công",
        error: "Không thể cập nhật hồ sơ"
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
export function registerProfileTranslations(i18nInstance) {
  // Handle both global instance and composable instance
  const globalInstance = i18nInstance.global || i18nInstance
  
  if (globalInstance && globalInstance.setLocaleMessage) {
    Object.keys(profileTranslations).forEach(locale => {
      const existing = globalInstance.getLocaleMessage(locale) || {}
      globalInstance.setLocaleMessage(locale, {
        ...existing,
        ...profileTranslations[locale]
      })
    })
    console.log('[I18N] Profile section translations registered')
  } else {
    console.warn('[I18N] Invalid i18n instance provided to registerProfileTranslations', i18nInstance)
  }
}