<template>
  <div>
    <h1>Hello</h1>
    <div v-for="home in homes" :key="home.objectID" class="home-card">
      <nuxt-link :to="`/homes/${home.objectID}`">
        <home-card :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from '@/data/homes.json';

export default {
  data() {
    return {
      homes: homes.slice(0, 3),
    };
  },
  head() {
    return {
      title: 'HomePage',
      meta: [
        {
          name: 'description',
          content: 'This is a homepage',
          hid: 'description',
        },
      ],
    };
  },
};
</script>

<style scoped>
.home-card {
  float: left;
  margin: 10px;
}
</style>
