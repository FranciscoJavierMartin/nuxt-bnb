<template>
  <div>
    <div class="app-wrapper app-padded-vertical">
      <h2 class="app-subtitle">Location</h2>
      <p class="app-description">
        {{ home.location.address }}
        {{ home.location.city }}
        {{ home.location.state }}
        {{ home.location.name }}
      </p>
      <div class="app-map">
        <client-only placeholder="Loading...">
          <l-map
            :options="{ zoomControl: false, scrollWheelZoom: false }"
            :zoom="mapOptions.zoom"
            :center="mapOptions.center"
          >
            <l-tile-layer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-marker
              v-for="(marker, index) in markers"
              :key="index"
              :lat-lng="[marker.lat, marker.lng]"
            >
              <l-popup>{{ marker.title }}</l-popup>
            </l-marker>
          </l-map>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    markers: {
      type: Array,
      default: () => [],
    },
    zoom: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    mapOptions() {
      return {
        zoom: this.zoom,
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
