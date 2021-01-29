<template>
  <div>
    <img :src="home.images[0]" style="width: 200px" :alt="home.title" />
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
