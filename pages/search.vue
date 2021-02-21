<template>
  <div v-if="homes && homes.length > 0" class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title">Stays in {{ label }}</h2>
        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <HomeRow class="app-house" :home="home" />
        </nuxt-link>
      </div>
      <div class="app-search-results-map">
        <!-- <PropertyMap
          :zoom="15"
          :lat="+lat"
          :lng="+lng"
          :markers="getHomesMarkers()"
        ></PropertyMap> -->
      </div>
    </div>
  </div>
  <div v-else class="text-center app-search-results-page">
    <h2 class="app-title">No results found</h2>
    <span class="text-gray-600 text-xl">Try with another location</span>
  </div>
</template>

<script>
export default {
  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(
      to.query.lat,
      to.query.lng
    );
    this.homes = data.json.hits;
    this.label = to.query.label;
    this.lat = to.query.lat;
    this.lng = to.query.lng;
    next();
  },
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },
  methods: {
    getHomesMarkers() {
      return this.homes.length === 0
        ? null
        : this.homes.map((home) => ({
            ...home._geoloc,
            title: home.title,
          }));
    },
  },
  head() {
    return {
      title: `Homes around ${this.label}`,
    };
  },
};
</script>
