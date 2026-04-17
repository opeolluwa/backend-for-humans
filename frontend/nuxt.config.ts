// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    pageTransition: { name: "slide-left", mode: "out-in" },
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },
  modules: [
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "nuxt-viewport",
    "@nuxtjs/color-mode",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-seo-utils",
    "@nuxtjs/google-fonts",

    ['@nuxtjs/google-fonts', {
        families: {
          Roboto: true,
          Inter: [400, 700],
          'Josefin+Sans': true,
          Lato: [100, 300],
          Raleway: {
            wght: [100, 400],
            ital: [100]
          },
          Poppins: '200..700',
          'Crimson Pro': {
            wght: '200..900',
            ital: '200..700',
          }
        }
    }],
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
});