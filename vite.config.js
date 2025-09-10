  import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import fs from "fs-extra";
import { join } from "path";

async function generateManifest() {
  const outputDir = join(__dirname, "dist/assets");
  const distDir = join(__dirname, "dist");
  const bundles = {};

  await fs.ensureDir(distDir);

  if (!(await fs.exists(outputDir))) {
    console.log(
      "[MANIFEST_SKIP] Assets directory not found, creating empty manifest."
    );
    await fs.writeJson(join(distDir, "section-bundles.json"), bundles);
    return;
  }

  const files = await fs.readdir(outputDir);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    if (file.startsWith("section-auth")) bundles["auth"] = `/assets/${file}`;
    if (file.startsWith("section-dashboard"))
      bundles["dashboard"] = `/assets/${file}`;
    if (file.startsWith("section-profile"))
      bundles["profile"] = `/assets/${file}`;
    if (file.startsWith("section-discover"))
      bundles["discover"] = `/assets/${file}`;
    if (file.startsWith("section-shop")) bundles["shop"] = `/assets/${file}`;
    if (file.startsWith("section-misc")) bundles["misc"] = `/assets/${file}`;
  });

  await fs.writeJson(join(distDir, "section-bundles.json"), bundles);
  console.log(
    "[MANIFEST_GENERATED] section-bundles.json created successfully."
  );
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), vueDevTools()],
    define: {
      global: "globalThis",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        buffer: "buffer",
      },
    },
    publicDir: "public",
    test: {
      environment: "jsdom",
      globals: true,
    },
    build: {
      sourcemap: true,
      assetsInlineLimit: 0,
      rollupOptions: {
                        output: {
                  manualChunks(id) {
                    // Bundle components by section
                    if (id.includes("/components/auth/") || id.includes("/i18n/sections/auth.js")) {
                      return "section-auth";
                    }
                    if (id.includes("/components/dashboard/") || id.includes("/i18n/sections/dashboard.js")) {
                      return "section-dashboard";
                    }
                    if (id.includes("/components/profile/") || id.includes("/i18n/sections/profile.js")) {
                      return "section-profile";
                    }
                    if (id.includes("/components/discover/") || id.includes("/i18n/sections/discover.js")) {
                      return "section-discover";
                    }
                    if (id.includes("/components/shop/") || id.includes("/i18n/sections/shop.js")) {
                      return "section-shop";
                    }
                    if (id.includes("/components/NotFound.vue")) return "section-misc";
                    
                    // Bundle translation utils
                    if (id.includes("/utils/translationUtils.js")) return "translation-utils";
                  },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
        plugins: [
          {
            name: "generate-manifest",
            async closeBundle() {
              await generateManifest();
            },
          },
        ],
      },
    },
  };
});
