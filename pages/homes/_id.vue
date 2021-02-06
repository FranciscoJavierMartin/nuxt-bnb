<template>
  <div class="app-container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <!-- <home-map :makers="[marker]" /> -->
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $dataApi, error }) {
    let res;

    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);

    if (badResponse) {
      res = error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });
    } else {
      res = {
        home: responses[0].json,
        reviews: responses[1].json.hits,
        user: responses[2].json.hits[0],
      };
    }

    return res;
  },
  computed: {
    marker() {
      return {
        lat: this.home._geoloc.lat,
        lng: this.home._geoloc.lng,
        title: this.home.title,
      };
    },
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
