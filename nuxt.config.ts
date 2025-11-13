// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image'],
  runtimeConfig: {
    brToken: process.env.BR_TOKEN, // öffentlich: false
    brTable: process.env.BR_TABLE,
    brDb: process.env.BR_DB
  },
  ssr: true
})