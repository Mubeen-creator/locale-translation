// Use relative glob patterns to avoid Vite virtual module path issues
const authModules = import.meta.glob("../components/auth/**/*.vue", { eager: false });
const dashboardModules = import.meta.glob("../components/dashboard/**/*.vue", { eager: false });
const profileModules = import.meta.glob("../components/profile/**/*.vue", { eager: false });
const discoverModules = import.meta.glob("../components/discover/**/*.vue", { eager: false });
const shopModules = import.meta.glob("../components/shop/**/*.vue", { eager: false });
const miscModules = import.meta.glob("../components/NotFound.vue", { eager: false });
const usernameModules = import.meta.glob("../components/_username.vue", { eager: false });

// Combine all modules (excludes LocaleSwitcher and NavBar automatically)
const modules = {
  ...authModules,
  ...dashboardModules,
  ...profileModules,
  ...discoverModules,
  ...shopModules,
  ...miscModules,
  ...usernameModules
};

export function lazy(path) {
  if (!path || typeof path !== "string") {
    return () => Promise.reject(new Error("lazy(): invalid path"));
  }
  if (path.includes("App.vue") || path.includes("LocaleSwitcher.vue")) {
    return () =>
      Promise.reject(new Error("lazy(): cannot dynamically load this component"));
  }
  let normalized = path.replace(/^@\/?/, "../");
  if (!normalized.startsWith("../")) {
    normalized = `../${normalized.replace(/^\//, "")}`;
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
