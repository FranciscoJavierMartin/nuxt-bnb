<template>
  <div>
    <nuxt-img
      :src="home.images[0]"
      :width="200"
      heifht="150"
      provider="cloudinary"
      :alt="home.title"
    />
    {{ home.title }}
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.guests }} guests
    {{ home.pricePerNight }} / night
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
};
</script>
