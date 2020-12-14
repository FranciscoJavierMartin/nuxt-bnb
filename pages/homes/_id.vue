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
      {{ formatDate(review.date) }}
      <short-text :text="review.comment" :target="150" />
    </div>
    <img :src="user.image" />
    {{ user.name }}
    {{ formatDate(user.joined) }}
    {{ user.reviewCount }}
    {{ user.description }}
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
        reviews: responses[1].json,
        user: responses[2].json,
      };
    }

    return res;
  },
  head() {
    return {
      title: this.home.title,
    };
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      });
    },
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
