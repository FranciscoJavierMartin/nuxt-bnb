<template>
  <div>
    <div>Results for {{ label }}</div>
    <HomeMap
      :zoom="15"
      :lat="+lat"
      :lng="+lng"
      :markers="getHomesMarkers()"
    ></HomeMap>
    <div v-if="homes.length > 0">
      <nuxt-link
        v-for="home in homes"
        :key="home.objectID"
        :to="`/home/${home.objectID}`"
      >
        <HomeRow :home="home" />
      </nuxt-link>
    </div>
    <div v-else>No results found</div>
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
      return this.homes.map((home) => ({
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
