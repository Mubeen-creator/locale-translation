// Section-specific translations for shop  
// This file will be bundled with the shop section components

// Inline translations to prevent separate chunks
export const shopTranslations = {
  en: {
    shop: {
      page: {
        title: "Shop",
        description: "Browse and purchase products"
      },
      sections: {
        products: "Products"
      },
      messages: {
        comingSoon: "More products coming soon!"
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
    shop: {
      page: {
        title: "Cửa hàng",
        description: "Duyệt và mua sản phẩm"
      },
      sections: {
        products: "Sản phẩm"
      },
      messages: {
        comingSoon: "Sẽ có thêm sản phẩm sớm!"
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
export function registerShopTranslations(i18nInstance) {
  if (i18nInstance && i18nInstance.global) {
    Object.keys(shopTranslations).forEach(locale => {
      const existing = i18nInstance.global.getLocaleMessage(locale) || {}
      i18nInstance.global.setLocaleMessage(locale, {
        ...existing,
        ...shopTranslations[locale]
      })
    })
    console.log('[I18N] Shop section translations registered')
  }
}