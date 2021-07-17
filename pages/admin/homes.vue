<template>
  <div>
    <span v-for="home in homeList" :key="home.objectID">
      {{ home.title }}:<button
        class="text-red-800"
        @click="deleteHome(home.objectID)"
      >
        Delete</button
      ><br />
    </span>
    <h2 class="text-xl bold">Add a Home</h2>
    <form class="form" @submit.prevent="onSubmit">
      <ImageUploader @file-uploaded="imageUpdated($event, 0)" />
      <ImageUploader @file-uploaded="imageUpdated($event, 1)" />
      <ImageUploader @file-uploaded="imageUpdated($event, 2)" />
      <ImageUploader @file-uploaded="imageUpdated($event, 3)" />
      <ImageUploader @file-uploaded="imageUpdated($event, 4)" />
      Images:<br />
      <input v-model="home.images[0]" type="text" class="w-3/4" /><br />
      <input v-model="home.images[1]" type="text" class="w-3/4" /><br />
      <input v-model="home.images[2]" type="text" class="w-3/4" /><br />
      <input v-model="home.images[3]" type="text" class="w-3/4" /><br />
      <input v-model="home.images[4]" type="text" class="w-3/4" /><br />
      Title: <br />
      <input v-model="home.title" type="text" class="w-60" /><br />
      Description<br />
      <textarea v-model="home.description" class="w-104"></textarea><br />
      Note<br />
      <textarea v-model="home.note" class="w-104"></textarea><br />
      Features<br />
      <input v-model="home.features[0]" type="text" class="w-26" />
      <input v-model="home.features[1]" type="text" class="w-26" />
      <input v-model="home.features[2]" type="text" class="w-26" />
      <input v-model="home.features[3]" type="text" class="w-26" />
      <input v-model="home.features[4]" type="text" class="w-26" />
      Price Per Night<br />
      <input v-model="home.pricePerNight" type="number" class="w-14" /><br />
      Guests / Rooms / Beds / Baths<br />
      <input v-model="home.guests" type="number" class="w-14" /><br />
      <input v-model="home.bedrooms" type="number" class="w-14" /><br />
      <input v-model="home.beds" type="number" class="w-14" /><br />
      <input v-model="home.bathrooms" type="number" class="w-14" /><br />
      Address:
      <input v-model="home.location.address" type="text" class="w-60" /><br />
      City:
      <input v-model="home.location.city" type="text" class="w-60" /><br />
      State:
      <input v-model="home.location.state" type="text" class="w-60" /><br />
      Postal Code:
      <input
        v-model="home.location.postalCode"
        type="text"
        class="w-60"
      /><br />
      Country:
      <input v-model="home.location.country" type="text" class="w-60" /><br />
      <button class="border px-4 py-2 border-gray-400">Add</button>
    </form>
  </div>
</template>

<script>
import { unWrap } from '~/utils/fetchUtils';

export default {
  data() {
    return {
      homeList: [],
      home: {
        title: '',
        description: '',
        note: '',
        pricePerNight: '',
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        features: ['', '', '', '', ''],
        location: {
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        _geoloc: {
          lat: 26.1,
          lng: 26.1,
        },
        images: ['', '', '', '', ''],
      },
    };
  },
  mounted() {
    this.setHomesList();
  },
  methods: {
    change(event) {
      const addressParts = event.detail.address_components;
      const street =
        this.getAddressPart(addressParts, 'street-number')?.short_name || '';
      const route =
        this.getAddressPart(addressParts, 'route')?.short_name || '';
      this.home.location.address = `${street} ${route}`;
      this.home.location.city =
        this.getAddressPart(addressParts, 'locality')?.short_name || '';
      this.home.location.state =
        this.getAddressPart(addressParts, 'administrative_area_level_1')
          ?.short_name || '';
      this.home.location.country =
        this.getAddressPart(addressParts, 'country')?.short_name || '';
      this.home.location.postalCode =
        this.getAddressPart(addressParts, 'postal_code')?.short_name || '';

      const geo = event.detail.geometry.location;
      this.home._geoloc.lat = geo.lat();
      this.home._geoloc.lng = geo.lng();
    },
    getAddressPart(parts, type) {
      return parts.find((part) => part.types.includes(type));
    },
    imageUpdated(imageUrl, index) {
      this.home.images[index] = imageUrl;
    },
    async onSubmit() {
      const response = await unWrap(
        await fetch('api/homes', {
          method: 'POST',
          body: JSON.stringify(this.home),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      this.homeList.push({
        title: this.home.title,
        objectID: response.json.homeId,
      });
    },
    async setHomesList() {
      this.homeList = (await unWrap(await fetch('/api/homes/user'))).json;
    },
    async deleteHome(homeId) {
      await fetch(`/api/homes/${homeId}`, {
        method: 'DELETE',
      });
      const index = this.homeList.findIndex((obj) => obj.objectID === homeId);
      this.homeList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.form input,
.form textarea {
  @apply p-1 m-1 bg-gray-200;
}
</style>
