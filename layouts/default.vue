<template>
  <div class="app">
    <header class="app-header">
      <nuxt-link class="app-logo" to="/">
        <img src="/images/logo.svg" />
      </nuxt-link>
      <div class="app-search">
        <location-search-input />
        <input type="text" class="datepicker" placeholder="Check in" />
        <input type="text" class="datepicker" placeholder="Check out" />
        <button>
          <img src="/images/icons/search.svg" />
        </button>
      </div>
      <div class="app-user-menu">
        <img src="/images/icons/house.svg" />
        <div class="name">Host</div>
        <div id="googleButton"></div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
import LocationSearchInput from '~/components/LocationSearchInput.vue';
export default {
  components: { LocationSearchInput },
  created() {
    console.log('Created', this.$config.test1, this.$config.test2);
  },
};
</script>

<style scoped>
.header {
  background-color: #eee;
  display: flex;
  flex: row;
}
</style>
