export default {
  app: {
    head: {
      title: 'Mail Box',
    },
  },
  buildModules: [
    "@nuxtjs/composition-api/module",
    "@pinia/nuxt",
  ],
  ssr: true,
  modules: ["@pinia/nuxt"],
};
