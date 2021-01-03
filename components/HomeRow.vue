<template>
  <div style="clear: left">
    <img
      :src="home.images[0]"
      style="width: 200px; float: left; padding: 10px"
      :alt="home.title"
    />
    {{ home.title }}
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ pluralize(home.guests, 'guest') }},
    {{ pluralize(home.bedrooms, 'room') }}, {{ pluralize(home.beds, 'bed') }},
    {{ pluralize(home.batrooms, 'bath') }} {{ home.pricePerNight }} / night
    <img src="/images/star.svg" width="20" height="20" />{{
      home.reviewValue
    }}
    ({{ home.reviewCount }})
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
  methods: {
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      return number > 1 ? text + 's' : text;
    },
  },
};
</script>
