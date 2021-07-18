<template>
  <div class="app-container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <!-- <home-map :makers="[marker]" /> -->
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
    <script type="application/json" v-html="getSchema" />
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
    getSchema() {
      return JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'BedAndBreakfast',
        name: this.home.title,
        image: this.$img(
          this.home.images[0],
          { width: 1200 },
          { provider: 'cloudinary' }
        ),
        address: {
          '@types': 'PostalAddress',
          addressLocality: this.home.locality.city,
          addressRegion: this.home.location.state,
          postalCode: this.home.location.zipcode,
          streetAddress: this.home.location.address,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: this.home.reviewValue,
          reviewCount: this.home.reviewCount,
        },
      });
    },
  },
  head() {
    return {
      title: this.home.title,
      meta: [
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og-title',
          property: 'og:title',
          content: this.home.title,
        },
        {
          hid: 'og-desc',
          property: 'og:description',
          content: this.home.description,
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: this.$img(
            this.home.images[0],
            { width: 1200 },
            { provider: 'cloudinary' }
          ),
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: `${this.$config.rootUrl}/home/${this.home.objectID}`,
        },
        {
          hid: 't-type',
          property: 'twitter:card',
          content: 'summary_large-image',
        },
      ],
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
