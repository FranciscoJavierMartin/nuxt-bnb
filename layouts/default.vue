<template>
  <div class="app">
    <header class="app-header">
      <nuxt-link class="app-logo" to="/">
        <img src="/images/logo.svg" />
      </nuxt-link>
      <div class="app-search">
        <location-search-input />
        <client-only>
          <template #placeholder>
            <input class="datepicker" />
            <span class="-ml-6 mr-r">to</span>
            <input class="datepicker" />
          </template>
          <data-picker
            v-model="range"
            is-range
            timezone="UTC"
            :model-config="{ timeAdjust: '00:00:00' }"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="datepicker"
                :value="inputValue.start"
                v-on="inputEvents.start"
              />
              <span class="-ml-6 mr-r">to</span>
              <input
                class="datepicker"
                :value="inputValue.end"
                v-on="inputEvents.end"
              />
            </template>
          </data-picker>
        </client-only>
        <button @click="search">
          <img src="/images/icons/search.svg" />
        </button>
      </div>
      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img src="/images/icons/house.svg" />
          <div class="name">Host</div>
          <img :src="user.profileUrl" class="avatar" />
        </template>
        <div v-show="!isLoggedIn" class="ml-8" id="googleButton"></div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
import LocationSearchInput from '~/components/LocationSearchInput.vue';
export default {
  components: { LocationSearchInput },
  data() {
    return {
      location: {
        lat: 0,
        lng: 0,
        label: '',
      },
      range: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
  methods: {
    search() {
      if (this.location.label) {
        this.$router.push({
          name: 'search',
          query: {
            ...this.location,
            start: this.range.start.getTime() / 1000,
            end: this.range.end.getTime() / 1000,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #eee;
  display: flex;
  flex: row;
}
</style>
