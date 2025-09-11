// Import components by section to avoid LocaleSwitcher conflicts
const authModules = import.meta.glob("/src/components/auth/**/*.vue", { eager: false });
const dashboardModules = import.meta.glob("/src/components/dashboard/**/*.vue", { eager: false });
const profileModules = import.meta.glob("/src/components/profile/**/*.vue", { eager: false });
const discoverModules = import.meta.glob("/src/components/discover/**/*.vue", { eager: false });
const shopModules = import.meta.glob("/src/components/shop/**/*.vue", { eager: false });
const miscModules = import.meta.glob("/src/components/NotFound.vue", { eager: false });

// Combine all modules
const modules = {
  ...authModules,
  ...dashboardModules,
  ...profileModules,
  ...discoverModules,
  ...shopModules,
  ...miscModules
};

export function lazy(path) {
  if (!path || typeof path !== "string") {
    return () => Promise.reject(new Error("lazy(): invalid path"));
  }
  if (path.includes("App.vue") || path.includes("LocaleSwitcher.vue")) {
    return () =>
      Promise.reject(new Error("lazy(): cannot dynamically load this component"));
  }
  let normalized = path.replace(/^@\/?/, "/src/");
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  const loader = modules[normalized];
  if (!loader) {
    return () =>
      Promise.reject(
        new Error(`lazy(): component not found for path ${normalized}`)
      );
  }
  return loader;
}
