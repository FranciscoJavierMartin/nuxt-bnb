<template>
  <div>
    <header class="header">
      <nuxt-link to="/">Home</nuxt-link>
      <div class="input-city">
        <input v-model="input" type="text" ref="citySearch" />
        <!-- <button @click="searchCity">Search</button> -->
        <div class="cities-list">
          <span
            v-for="city in results"
            :key="city.id"
            @click="setCity(city)"
            class="city-item"
          >
            {{ city.name }}
          </span>
        </div>
      </div>

      <!-- <search-input @input="showValue" /> -->
    </header>
    <nuxt />
  </div>
</template>

<script>
// import SearchInput from '~/components/SearchInput.vue';

export default {
  // components: { SearchInput },
  data() {
    return {
      prefix: '',
      results: [],
      timesout: null,
    };
  },
  computed: {
    input: {
      get() {
        return this.prefix;
      },
      set(val) {
        if (this.timesout) {
          clearTimeout(this.timesout);
        }
        this.timesout = setTimeout(() => {
          this.prefix = val;
          this.searchCity();
          console.log(val);
        }, 300);
      },
    },
  },
  methods: {
    searchCity() {
      // fetch(
      //   `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${this.prefix}&limit=5&offset=0&hateoasMode=false`
      // )
      //   .then(console.log)
      //   .catch(console.log);
      fetch(`/api/getJSON/${this.prefix}`)
        .then((res) => res.json())
        .then(({ cities }) => {
          this.results = cities;
          // cities.forEach((element) => {
          //   console.log(element);
          // });
        })
        .catch(console.log);
    },
    showValue(value) {
      console.log('Value', value);
    },
    setCity(city) {
      this.prefix = city.name;
      this.results = [];
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

.input-city {
  display: flex;
  flex-direction: column;
}

.cities-list {
  display: flex;
  flex-direction: column;
  z-index: 1000 !important;
}

.city-item {
  border: 1px solid black;
}
</style>
