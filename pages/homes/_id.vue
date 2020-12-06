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
    <home-map
      :lat="home._geoloc.lat"
      :lng="home._geoloc.lng"
      :title="home.title"
    />
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" />
      {{ review.reviewer.name }}
      {{ review.date }}
      {{ review.comment }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $dataApi, error }) {
    let res;
    const homeResponse = await $dataApi.getHome(params.id);

    if (homeResponse.ok) {
      const reviewResponse = await $dataApi.getReviewsByHomeId(params.id);
      if (reviewResponse.ok) {
        res = {
          home: homeResponse.json,
          reviews: reviewResponse.json.hits,
        };
      } else {
        res = error({
          statusCode: reviewResponse.status,
          message: reviewResponse.statusText,
        });
      }
    } else {
      res = error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });
    }
    return res;
  },
  head() {
    return {
      title: this.home.title,
    };
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
</style>
