export default {
  head: {
    title: 'Site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ],
  },

  css: [

  ],

  plugins: [
    '~/utils/date-formatter.js',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: [
      '~/assets/global.less'
    ]
  },
  axios: {
    baseURL: '/',
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  build: {},
}
