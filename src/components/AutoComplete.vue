<template>
  <div>
    <div class="max-w-xs">
      <input
        v-model="city"
        type="text"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        :placeholder="
          name === 'Lieu de départ' ? 'Vous partez d\'où ?' : 'Où allez-vous ?'
        "
        aria-label="Lieu"
        @keydown="getCity"
      />

      <div
        v-if="cities"
        class="suggestion rounded-lg border border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      >
        <button
          v-for="city in cities"
          :key="city"
          type="button"
          class="relative inline-flex w-full items-center rounded-t-lg border-b border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
          @click="setCity(city)"
        >
          {{ city.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useDebounceFn } from '@vueuse/core'

  const city = ref()
  const cities = ref()
  const citySelected = ref()

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    initialCity: {
      type: String,
      required: false,
      default: null,
    },
  })

  watch(
    () => props.initialCity,
    (value) => {
      city.value = value.name
      citySelected.value = value
    }
  )

  const emit = defineEmits(['citySelected'])

  const getCity = useDebounceFn(async () => {
    const result = await fetch(
      `${import.meta.env.VITE_API_MAPBOX}/${city.value}.json?access_token=${
        import.meta.env.VITE_API_MAPBOX_ACCESS_TOKEN
      }&language=fr-FR`
    )

    const data = await result.json()
    cities.value = data.features
  }, 500)

  const setCity = (cityData) => {
    citySelected.value = cityData
    cities.value = null
    city.value = cityData.place_name

    emit('citySelected', {
      name: cityData.place_name,
      coordinates: {
        longitude: cityData.geometry.coordinates[0],
        latitude: cityData.geometry.coordinates[1],
      },
    })
  }
</script>

<style>
  .suggestion {
    position: absolute;
    z-index: 10;
    width: 20rem;
  }
</style>
