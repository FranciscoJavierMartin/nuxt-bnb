<template>
  <div class="input-city">
    <input v-model="input" type="text" @keydown="keydownPress" />
    <div class="cities-list">
      <span
        v-for="(city, index) in results"
        :key="city.id"
        class="city-item"
        @click="setCity(city)"
        :class="{ focus: index === focus }"
      >
        {{ city.name }}, {{ city.region }}, {{ city.country }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      prefix: '',
      results: [],
      timesout: null,
      selectedCity: null,
      focus: null,
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
        this.timesout = setTimeout(async () => {
          this.prefix = val;
          this.results = await this.searchCity(val.split(',')[0]);
        }, 300);
      },
    },
  },
  methods: {
    // TODO: Refactor to a method that return an array of items
    async searchCity(searchTerm) {
      let res;
      try {
        const response = await fetch(`/api/geo/search-city/${searchTerm}`);
        res = (await response.json()).cities;
      } catch (error) {
        res = [];
      }
      // fetch(`/api/geo/search-city/${searchTerm}`)
      //   .then((res) => res.json())
      //   .then(({ cities }) => {
      //     this.results = cities;
      //   })
      //   .catch(() => {
      //     this.results = [];
      //   });
      return res;
    },
    setCity(city) {
      this.selectedCity = city;
      this.prefix = `${city.name}, ${city.region}, ${city.country}`;
      this.results = [];
      this.$router.push({
        name: 'search',
        query: {
          lat: city.latitude,
          lng: city.longitude,
          label: city.name,
        },
      });
    },
    keydownPress(event) {
      switch (event.keyCode) {
        // Arrow up
        case 38:
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus === 0) {
            this.focus = this.results.length - 1;
          } else if (this.focus > 0) {
            this.focus--;
          }
          break;
        // Arrow down
        case 40:
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus < this.results.length - 1) {
            this.focus++;
          } else if (this.focus === this.results.length - 1) {
            this.focus = 0;
          }
          break;
        // Enter
        case 13:
          this.setCity(this.results[this.focus]);
          break;
      }
    },
  },
};
</script>

<style scoped>
.input-city {
  display: flex;
  flex-direction: column;
  position: relative;
}

.input-city .cities-list {
  position: absolute;
  top: 100%;
}

.cities-list {
  display: flex;
  flex-direction: column;
  background-color: white;
}

.city-item {
  border: 1px solid black;
}

.city-item.focus {
  border: 1px solid blue;
  background-color: darkcyan;
}

.city-item:hover {
  border: 1px solid darkblue;
  background-color: cyan;
}
</style>
