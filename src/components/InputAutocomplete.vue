<template>
  <div>
    <div class="max-w-xs mt-4">
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >{{ name }}</label
      >
      <input
        type="text"
        id="departure_location"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Choisir la ville"
        v-model="city"
        @keydown="getCity"
      />

      <div
        v-if="cities"
        class="absolute z-10 w-1/5 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <button
          v-for="city in cities"
          :key="city"
          class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          type="button"
          @click="setCity(city)"
        >
          {{ city.place_name }}
        </button>
      </div>
    </div>

    <!-- <div
      v-if="citySelected"
      class="block max-w-xs p-6 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ citySelected.place_name }}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        Latitude :
        {{ citySelected.geometry.coordinates[1] }} Longitude
        {{ citySelected.geometry.coordinates[0] }}
      </p>
    </div> -->
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";

const city = ref();
const cities = ref();
const citySelected = ref();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  lastedCity: {
    type: String,
    default: "",
    required: false
  }
});

// watch(props.lastedCity, (newVal) => {
//   city.value = newVal
// })

// onMounted(async () => {
//   city.value = await props.lastedCity;
//   console.log("Lieu:",props.lastedCity)
// })
// LA VALEUR N'ARRIVE PAS DANS L'INPUT


const emit = defineEmits(["citySelected"]);

const getCity = useDebounceFn(async () => {
  const result = await fetch(
    `${import.meta.env.VITE_API_MAPBOX}/${city.value}.json?access_token=${
      import.meta.env.VITE_API_MAPBOX_ACCESS_TOKEN
    }&language=fr-FR`
  );

  const data = await result.json();
  cities.value = data.features;
  console.log(cities.value);
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