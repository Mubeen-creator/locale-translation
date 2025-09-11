<template>
  <div class="locale-switcher">
    <div class="locale-dropdown">
      <button 
        @click="toggleDropdown" 
        class="locale-button"
      >
        <span class="locale-flag">{{ currentLocaleInfo?.flag }}</span>
        <span class="locale-name">{{ currentLocaleInfo?.name }}</span>
        <span class="locale-arrow" :class="{ 'rotated': isDropdownOpen }">▼</span>
      </button>

      <div v-if="isDropdownOpen" class="locale-dropdown-menu">
        <button
          v-for="locale in supportedLocales"
          :key="locale.code"
          @click="switchLocale(locale.code)"
          class="locale-option"
          :class="{ 'active': locale.code === currentLocale }"
        >
          <span class="locale-flag">{{ locale.flag }}</span>
          <span class="locale-name">{{ locale.name }}</span>
          <span class="locale-native">{{ locale.nativeName }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isDropdownOpen = ref(false)

// Supported locales
const supportedLocales = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' }
]

// Computed properties
const currentLocale = computed(() => locale.value)
const currentLocaleInfo = computed(() => 
  supportedLocales.find(l => l.code === locale.value)
)

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const switchLocale = (localeCode) => {
  try {
    console.log(`[LocaleSwitcher] Switching locale from ${locale.value} to ${localeCode}`)
    
    // Update Vue i18n locale
    locale.value = localeCode
    
    // Save to localStorage
    localStorage.setItem('preferred-locale', localeCode)
    
    // Close dropdown
    isDropdownOpen.value = false
    
    console.log(`[LocaleSwitcher] ✅ Locale switched to: ${localeCode}`)
  } catch (error) {
    console.error('[LocaleSwitcher] Failed to switch locale:', error)
  }
}

// Initialize locale from localStorage
onMounted(() => {
  const savedLocale = localStorage.getItem('preferred-locale')
  if (savedLocale && supportedLocales.some(l => l.code === savedLocale)) {
    console.log(`[LocaleSwitcher] Restoring saved locale: ${savedLocale}`)
    locale.value = savedLocale
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.locale-switcher')) {
    isDropdownOpen.value = false
  }
}
</script>

<style scoped>
.locale-switcher {
  position: relative;
  display: inline-block;
}

.locale-dropdown {
  position: relative;
}

.locale-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.locale-button:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.locale-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.locale-flag {
  font-size: 16px;
}

.locale-name {
  font-weight: 500;
}

.locale-arrow {
  font-size: 10px;
  transition: transform 0.2s;
}

.locale-arrow.rotated {
  transform: rotate(180deg);
}

.locale-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
}

.locale-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.locale-option:hover {
  background: #f9fafb;
}

.locale-option.active {
  background: #eff6ff;
  color: #1d4ed8;
}

.locale-native {
  margin-left: auto;
  font-size: 12px;
  color: #6b7280;
}

.locale-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #6b7280;
  font-size: 14px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
