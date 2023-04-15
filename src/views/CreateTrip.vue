<template>
  <NavBar />
  <div class="create-trip flex h-screen w-screen items-center justify-center">
    <div
      class="block rounded-lg border border-gray-200 p-6 shadow dark:border-gray-700 dark:bg-gray-800 lg:w-1/2"
    >
      <h2 class="text-2xl font-bold text-white">Creer un trajet</h2>
      <form>
        <div class="mb-6 flex items-center">
          <AutoComplete
            name="Lieu de départ"
            class="flex-1"
            @city-selected="(e) => (trip.departure_location = e)"
          />
          <AutoComplete
            name="Lieu d'arrivée"
            class="ml-8 flex-1"
            @city-selected="(e) => (trip.arrival_location = e)"
          />
        </div>

        <div class="mb-6">
          <label
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Date de départ</label
          >
          <input
            id="starting-date"
            v-model="trip.departure_datetime"
            type="date"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="max_passengers"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Nbr de passagers max</label
          >
          <input
            id="max_passengers"
            v-model="trip.max_passengers"
            type="number"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="price"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Prix</label
          >
          <input
            id="price"
            v-model="trip.price"
            type="number"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="message"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Votre message</label
          >
          <textarea
            id="message"
            v-model="trip.content"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Ecrivez ici..."
          ></textarea>
        </div>

        <div class="flex">
          <button
            type="button"
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            @click="saveTrip"
          >
            Enregistrer
          </button>
          <router-link to="/dashboard" class="ml-8 block">
            <button
              type="button"
              class="return w-fulltext-gray-900 m-0 mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 px-5 py-2.5 py-2.5 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Annuler
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import NavBar from '../components/NavBar.vue'
  import AutoComplete from '../components/AutoComplete.vue'

  export default {
    name: 'CreateTrip',
    components: {
      AutoComplete,
      NavBar,
    },
    data() {
      return {
        trip: {
          departure_location: {
            name: '',
            coordinates: {
              latitude: 0.0,
              longitude: 0.0,
            },
          },
          arrival_location: {
            name: '',
            coordinates: {
              latitude: 0.0,
              longitude: 0.0,
            },
          },
          departure_datetime: null,
          max_passengers: 0,
          price: 0.0,
          content: '',
        },
      }
    },
    methods: {
      async saveTrip() {
        this.trip.departure_datetime = new Date(
          this.trip.departure_datetime
        ).toISOString()

        try {
          await axios.post('trips', this.trip, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.getters.getToken}`,
            },
          })
          this.$notyf.success('Votre trajet a bien été enregistré')

          this.$router.push('/dashboard')
        } catch (error) {
          alert('Une erreur est survenue')
        }
      },
    },
  }
</script>
