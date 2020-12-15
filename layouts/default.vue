<template>
  <div>
    <header class="header">
      <nuxt-link to="/">Home</nuxt-link>
      <location-search-input />
    </header>
    <nuxt />
  </div>
</template>

<script>
import LocationSearchInput from '~/components/LocationSearchInput.vue';
export default {
  components: { LocationSearchInput },
};
</script>

<style scoped>
.header {
  background-color: #eee;
  display: flex;
  flex: row;
}
</style>
