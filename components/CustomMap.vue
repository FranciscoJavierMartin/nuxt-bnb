<template>
  <div class="map">
    <client-only placeholder="Loading...">
      <l-map
        :options="{ zoomControl: false, scrollWheelZoom: false }"
        :zoom="mapOptions.zoom"
        :center="mapOptions.center"
      >
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="mapOptions.center"
          ><l-popup>{{ title }}</l-popup></l-marker
        >
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ['lat', 'lng', 'title'],
  computed: {
    mapOptions() {
      return {
        zoom: 20,
        center: [this.lat, this.lng],
        zoomControl: true,
      };
    },
  },
};
</script>

<style scoped>
.map {
  height: 800px;
  width: 800px;
}
</style>
