<template>
  <div>
    <div class="max-w-xs">
      <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="this.name === 'Lieu de départ' ? 'Vous partez d\'où ?': 'Où allez-vous ?'" v-model="city" @keydown="getCity" aria-label="Lieu"/>

      <div v-if="cities" class="text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <button v-for="city in cities" :key="city" @click="setCity(city)" type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
          {{ city.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

const city = ref();
const cities = ref();
const citySelected = ref();

defineProps({
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["citySelected"]);

const getCity = useDebounceFn(async () => {
  const result = await fetch(
    `${import.meta.env.VITE_API_MAPBOX}/${city.value}.json?access_token=${import.meta.env.VITE_API_MAPBOX_ACCESS_TOKEN
    }&language=fr-FR`
  );

  const data = await result.json();
  cities.value = data.features;
}, 500);

const setCity = (cityData) => {
  citySelected.value = cityData;
  cities.value = null;
  city.value = cityData.place_name;

  emit("citySelected", {
    name: cityData.place_name,
    coordinates: {
      longitude: cityData.geometry.coordinates[0],
      latitude: cityData.geometry.coordinates[1],
    },
  });
};
</script>

