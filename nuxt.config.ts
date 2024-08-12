// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  devtools: { enabled: false },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-08-08',
  routeRules: {
    '/api/get-data-table': {
      proxy: 'https://api.jsonserve.com/L0Yu2N',
    },
  },
})
