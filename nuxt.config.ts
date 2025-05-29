// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  sourcemap: {
      server: true,
      client: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@ant-design-vue/nuxt',
  ],

  routeRules: {
      '/': { redirect: '/dashboard' },
  },

  compatibilityDate: '2025-03-10'
});
