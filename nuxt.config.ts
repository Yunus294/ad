// https://nuxt.com/docs/api/configuration/nuxt-config
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
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.21.0/dist/tabler-icons.min.css",
        },
      ],
    },
  },
  pwa:  {
    registerType: "autoUpdate",
    manifest: {
      name: "AdMind",
      short_name: "AdMind",
      description: "App for ads",
      theme_color: "#4CAF50",
      background_color: "#ffffff",
      display: "standalone",
      icons: [],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      navigateFallback: '/index.html'
    },
    devOptions: {
      enabled: true,
      type: "module"
    }
  },
});
