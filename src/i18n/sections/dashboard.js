// Section-specific translations for dashboard
// This file will be bundled with the dashboard section components

// Inline translations to prevent separate chunks
export const dashboardTranslations = {
  en: {
    dashboard: {
      page: {
        title: "Dashboard",
        description: "Overview of your account"
      },
      actions: {
        editProfile: "Edit Profile",
        editSettings: "Edit Settings",
        myMedia: "My Media",
        viewStats: "View Statistics"
      },
      sections: {
        editProfile: {
          title: "Edit Profile",
          description: "Update your personal information"
        },
        editSettings: {
          title: "Account Settings",
          description: "Manage your account preferences"
        },
        myMedia: {
          title: "My Media",
          description: "Manage your uploaded content"
        }
      },
      messages: {
        welcome: "Welcome back, {0}!",
        stats: "You have {0} items"
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
    dashboard: {
      page: {
        title: "Bảng điều khiển",
        description: "Tổng quan tài khoản của bạn"
      },
      actions: {
        editProfile: "Sửa hồ sơ",
        editSettings: "Sửa cài đặt",
        myMedia: "Media của tôi",
        viewStats: "Xem thống kê"
      },
      sections: {
        editProfile: {
          title: "Sửa hồ sơ",
          description: "Cập nhật thông tin cá nhân"
        },
        editSettings: {
          title: "Cài đặt tài khoản",
          description: "Quản lý tùy chọn tài khoản"
        },
        myMedia: {
          title: "Media của tôi",
          description: "Quản lý nội dung đã tải lên"
        }
      },
      messages: {
        welcome: "Chào mừng trở lại, {0}!",
        stats: "Bạn có {0} mục"
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
export function registerDashboardTranslations(i18nInstance) {
  if (i18nInstance && i18nInstance.global) {
    // Merge translations into existing locale messages
    Object.keys(dashboardTranslations).forEach(locale => {
      const existing = i18nInstance.global.getLocaleMessage(locale) || {}
      i18nInstance.global.setLocaleMessage(locale, {
        ...existing,
        ...dashboardTranslations[locale]
      })
    })
    console.log('[I18N] Dashboard section translations registered')
  } else {
    console.warn('[I18N] Invalid i18n instance provided to registerDashboardTranslations')
  }
}