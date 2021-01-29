<template>
  <div class="input-city">
    <input v-model="input" type="text" @keydown="keydownPress" />
    <div class="cities-list">
      <span
        v-for="(city, index) in results"
        :key="city.id"
        :class="{ focus: index === focus }"
        class="city-item"
        @click="setCity(city)"
      >
        {{ city.name }}, {{ city.region }}, {{ city.country }}
      </span>
    </div>
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
        this.timesout = setTimeout(async () => {
          this.prefix = val;
          this.focus = null;
          this.results = await this.searchCity(val.split(',')[0]);
        }, 300);
      },
    },
  },
  methods: {
    async searchCity(searchTerm) {
      let res;
      try {
        const response = await fetch(`/api/geo/search-city/${searchTerm}`);
        res = (await response.json()).cities;
      } catch (error) {
        res = [];
      }
      return res;
    },
    setCity(city) {
      this.selectedCity = city;
      this.prefix = `${city.name}, ${city.region}, ${city.country}`;
      this.focus = null;
      this.results = [];
      let whereToGo;

      // Only for developer purposes
      if (city.name.includes('eaver')) {
        whereToGo = {
          name: 'search',
          query: {
            lat: 39.604225,
            lng: -106.516515,
            label: 'Beaver Creek',
          },
        };
      } else if (city.name.includes('vail') || city.name.includes('Vail')) {
        whereToGo = {
          name: 'search',
          query: {
            lat: 39.6402638,
            lng: -106.3741955,
            label: 'Vail',
          },
        };
      } else {
        whereToGo = {
          name: 'search',
          query: {
            lat: city.latitude,
            lng: city.longitude,
            label: city.name,
          },
        };
      }

      this.$router.push(whereToGo);
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
