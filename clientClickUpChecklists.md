 No build config changes. No template imports. Use your existing config-driven router + guard. Here’s the minimal set of patches so locales are flat JSON, registered per-section, and loaded by the same lazy chain your router already uses—so they end up in the same section chunk, and there are no locale-*.js files.
1) Add flat, section-scoped JSON + registrar (repeat per section)

// src/i18n/sections/auth/index.tsimport en from './en.json';
import vi from './vi.json';
import { i18n } from '@/i18n'; // your existing vue-i18n instanceexport default function registerAuthLocales(): void {
  const g = i18n.global;
  const set = (loc: string, msgs: Record<string, string>) => {
    const cur = g.getLocaleMessage(loc) || {};
    g.setLocaleMessage(loc, { ...cur, auth: { ...(cur as any).auth, ...msgs } });
  };
  set('en', en);
  set('vi', vi);
}

// src/i18n/sections/auth/en.json{ "title": "Welcome Back", "description": "Sign In" }

// src/i18n/sections/auth/vi.json{ "title": "Chào mừng trở lại", "description": "Đăng nhập" }
Do the same for dashboard (and any other section):
src/i18n/sections/dashboard/{en,vi}.json + index.ts that registers under dashboard.
2) Patch your router lazy factory (one place, no route file changes)
In your zip, you have a central lazy loader (e.g. src/router/lazy.ts or wherever your routes consume lazy(section, path) from the config). Patch that function only.

// src/router/lazy.ts  (PATCH this function you already export and use in routeConfig)export function lazy(section: string, importer: () => Promise<any>) {
  return async () => {
    // Import the section registrar and the component together,// so Vite bundles them into the SAME dynamic chunk.const [reg, cmp] = await Promise.all([
      import(/* @vite-ignore */ `@/i18n/sections/${section}/index.ts`).then(m => m.default?.()),
      importer()
    ]);
    return (cmp as any).default || cmp;
  };
}
You do not touch your routes or config—wherever you currently call lazy('auth', () => import('@/sections/auth/LoginPage.vue')) keeps working exactly the same. Now the locale registrar is pulled in with the section.
3) Stop global fetch in your Enterprise loader, use section JSON
In your existing src/i18n/enterprise/loader.ts, patch only the internal load used by the guard (it currently fetch()es a global file). Make it import the section JSON instead.

// src/i18n/enterprise/loader.ts  (PATCH the method that loads messages)private async performLoad(locale: string, section?: string): Promise<Record<string, any>> {
  // If called with a section, import only that section’s flat JSONif (section) {
    const mod = await import(
      /* @vite-ignore */ `@/i18n/sections/${section}/${locale}.json`
    );
    const flat = (mod as any).default || mod;
    return { [section]: { ...flat } };
  }

  // Rare fallback: load all sections for this locale via globconst glob = import.meta.glob('/src/i18n/sections/*/*.json');
  const out: Record<string, any> = {};
  await Promise.all(
    Object.keys(glob)
      .filter(p => p.endsWith(`/${locale}.json`))
      .map(async p => {
        const m = await glob[p]();
        const sec = p.split('/i18n/sections/')[1].split('/')[0];
        out[sec] = { ...((m as any).default || m) };
      })
  );
  return out;
}
Your guard continues to call preloadLocale(locale, section)—now it imports @/i18n/sections/${section}/${locale}.json (which Vite will collocate with the section chunk because of the lazy factory patch above). No route edits. No new config.
4) Usage stays the same
Keep $t('auth.title'), $t('dashboard.welcome', ['Linden']).
Keep your router config and preload guard exactly as-is.
No per-component/template imports.
5) Acceptance checks
Build → dist has only your section-*.js (slightly larger); no locale-*.js.
Network:
First load a route in auth → only section-auth*.js (no extra translation request).
Navigate to preloaded dashboard → instant, no translation request.
Switch locale → strings swap with no network calls (both en and vi are registered by the registrar pulled with the section).
6) What changed (exactly one touchpoint)
Added: src/i18n/sections/<section>/{en,vi}.json + index.ts registrar.
Patched: one function (lazy()) so the registrar is imported alongside the section.
Patched: loader’s performLoad() to import section JSON instead of fetching a global file.
That’s it—no duplicate router config, no manualChunks tinkering, no template changes.