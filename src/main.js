import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { useSectionsStore } from "./stores/sectionStore";

// Create simple i18n instance with Vietnamese as default
const i18n = createI18n({
  legacy: false,
  locale: 'vi', // Set Vietnamese as default
  fallbackLocale: 'en',
  messages: {
    en: {},
    vi: {}
  }
});

// Make i18n globally accessible for locale switching
window.globalI18n = i18n;

console.log('[I18N] Created i18n instance with locale:', i18n.global.locale.value);
console.log('[I18N] Available locales:', i18n.global.availableLocales);

async function initializeApp() {
  const app = createApp(App);

  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);

  // Use simple i18n - no separate translation loading
  console.log('[I18N] Using bundled translations system');

  const auth = useAuthStore();
  const sectionsStore = useSectionsStore();

  auth.refreshFromStorage();
  sectionsStore.hydrate();

  // Wait for router to be ready before restoring session
  router.isReady().then(() => {
    const publicRoutes = [
      "/log-in",
      "/sign-up",
      "/lost-password",
      "/reset-password",
      "/confirm-email",
      "/",
    ];
    if (!publicRoutes.includes(router.currentRoute.value.path)) {
      authHandler
        .restoreSession()
        .then(({ idToken, accessToken, refreshToken }) => {
          console.log("[MAIN] Session restored, setting token");
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          auth.setTokenAndDecode(idToken);
          auth.startTokenRefreshLoop();
        })
        .catch((err) => {
          console.log("[MAIN] Session restoration failed:", err.message || err);
          auth.logout();
          if (!publicRoutes.includes(router.currentRoute.value.path)) {
            router.push("/log-in");
          }
        });
    } else {
      console.log(
        "[MAIN] Skipping session restoration on public route:",
        router.currentRoute.value.path
      );
    }
  });

  app.use(router);
  app.use(i18n);
  
  // Make i18n available globally for debugging
  app.config.globalProperties.$i18n = i18n;
  
  app.mount("#app");
}

// Initialize the app
initializeApp().catch(console.error);
