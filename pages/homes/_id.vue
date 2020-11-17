<template>
  <div>
    <div class="carousel">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        :alt="home.title"
      />
    </div>
    {{ home.title }}
    ${{ home.pricePerNigh }} / night
    <img src="/images/marker.svg" width="20" height="20" alt="marker" />
    {{ home.location.address }}
    {{ home.location.city }}
    {{ home.location.state }}
    {{ home.location.name }}
    <img src="/images/star.svg" width="20" height="20" alt="review" />
    {{ home.reviewValue }}
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bathrooms
    {{ home.description }}
    <div class="map">
      <client-only placeholder="Loading...">
        <l-map
          :options="{ zoomControl: false, scrollWheelZoom: false }"
          :zoom="this.mapOptions.zoom"
          :center="this.mapOptions.center"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="this.mapOptions.center"
            ><l-popup>{{ home.title }}</l-popup></l-marker
          >
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import homes from '@/data/homes.json';

export default {
  data() {
    return {
      home: {},
    };
  },
  computed: {
    mapOptions() {
      return {
        zoom: 20,
        center: [this.home._geoloc.lat, this.home._geoloc.lng],
        zoomControl: true,
      };
    },
  },
  created() {
    const home = homes.find((h) => h.objectID === this.$route.params.id);
    this.home = home;
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
}

.carousel img {
  height: 150px;
  width: 200px;
}

.map {
  height: 800px;
  width: 800px;
}
</style>
