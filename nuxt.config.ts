export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vite-pwa/nuxt"],
  css: ["@/assets/style/main.css"],

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/icons/android-chrome-192x192.png",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.21.0/dist/tabler-icons.min.css",
        },
      ],
    },
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "AdMind",
      short_name: "AdMind",
      description: "App for ads",
      theme_color: "#4CAF50",
      background_color: "#ffffff",
      display: "standalone",
      icons: [
        {
          src: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },

    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      navigateFallback: "/index.html",
      additionalManifestEntries: [{ url: "/index.html", revision: null }],
      runtimeCaching: [
        {
          urlPattern:
            /^https:\/\/(loremflickr\.com|picsum\.photos|cloudflare-ipfs\.com|fakerjs\.dev)\/.*$/i,
          handler: "CacheFirst",
          options: {
            cacheName: "external-images-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7, 
            },
          },
        },
      ],
    },
  },
});
