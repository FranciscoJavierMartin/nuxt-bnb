<template>
  <div>
    <header class="header">
      <nuxt-link to="/">Home</nuxt-link>
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
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
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
        this.timesout = setTimeout(() => {
          this.prefix = val;
          this.searchCity(val.split(',')[0]);
        }, 300);
      },
    },
  },
  methods: {
    searchCity(searchTerm) {
      fetch(`/api/geo/search-city/${searchTerm}`)
        .then((res) => res.json())
        .then(({ cities }) => {
          this.results = cities;
        })
        .catch(() => {
          this.results = [];
        });
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
.header {
  background-color: #eee;
  display: flex;
  flex: row;
}

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
