<template>
  <div class="app-padded-vertical">
    <div class="app-wrapper">
      <div class="app-testimonials">
        <div v-for="(review, index) in reviews" :key="index">
          <div class="app-testimonial-header">
            <div>
              <img :src="review.reviewer.image" />
            </div>
            <div>
              <p class="app-testimonial-name">
                {{ review.reviewer.name }}
              </p>
              <p class="app-testimonial-date">
                {{ formatDate(review.date) }}
              </p>
            </div>
          </div>
          <div class="app-testimonial-body">
            <short-text :text="review.comment" :target="150" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '../utils/formatDate';
import ShortText from './ShortText.vue';

export default {
  components: { ShortText },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>
