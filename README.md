# Nuxt BnB

An AirBnB clone made with Nuxt.js. You can see the live site at https://nuxt-bnb.vercel.app/

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Interesting topics about Nuxt.js and other technologies used on this project

### Prefecthing on links

By default on nuxt, the pages for links inside the viewport are preloaded. Supose that you have a list of homes and every home contains a link to the detail page. The file called \_id.js on the network tab is only preloaded once, but is an extra time that is not worthy if the user don't access to the detail page. You can disable this for one particular link adding the attribute _no-prefecth_ on the _nuxt-link_ component, or disable globally adding to the _nuxt.config.js_ file

```
// nuxt.config.js

router: {
  prefecthLinks: false,
}
```

and add _prefecth_ to a _nuxt-link_ if you want to enable for a specific link.

### Third party libraries

Every third party libraries that you load (execpt nuxt) is inside your browser, so take care with the memory.
