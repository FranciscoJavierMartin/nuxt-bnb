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
  plugins: [
    '~/plugins/dataApi',
    '~/plugins/auth.client',
    '~/plugins/vCalendar.client',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
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
      clientId: '',
    },
    algolia: {
      appId: '',
      key: '',
    },
    cloudinary: {
      apiKey: '',
    },
    image: {
      cloudinary: {
        baseURL: 'https://res.cloudinary.com/<your-cloud-name>/image/upload',
      },
    },
    stripe: {
      key: '',
    },
  },
  privateRuntimeConfig: {
    algolia: {
      appId: '',
      key: '',
    },
    cloudinary: {
      apiSecret: '',
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },

  cloudinary: {
    cloudName: '',
  },
};

export default config;
