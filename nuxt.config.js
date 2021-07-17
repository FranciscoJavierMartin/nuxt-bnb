const config = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Matering Nuxt: %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: ['my-style'],
    },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/sass/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/dataApi', '~/plugins/auth.client'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-leaflet',
    '~/modules/auth',
    '~/modules/algolia',
    '~/modules/cloudinary',
    '@nuxtjs/cloudinary',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },

  router: {
    prefetchLinks: false,
  },

  serverMiddleware: [{ path: '/api/geo', handler: '~/api/geodb.js' }],

  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId:
        '313674783957-8pdade8bqpptt8n72ptpde4qggndjm35.apps.googleusercontent.com',
    },
    algolia: {
      appId: '1E5T8VGYOV',
      key: '09b6757e09f9eff27791af6b3f026351',
    },
    cloudinary: {
      apiKey: '',
    },
  },
  privateRuntimeConfig: {
    algolia: {
      appId: '1E5T8VGYOV',
      key: '035bfbbad856651b4f0a06797bd830fe',
    },
    cloudinary: {
      apiSecret: '',
    },
  },

  cloudinary: {
    cloudName: '',
  },
};

export default config;
