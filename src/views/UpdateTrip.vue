<template>
  <NavBar />
  <div class="create-trip flex h-screen w-screen items-center justify-center">
    <div
      class="block rounded-lg border border-gray-200 p-6 shadow dark:border-gray-700 dark:bg-gray-800 lg:w-1/2"
    >
      <h2 class="mb-2 text-2xl font-bold text-white">Modifier mon trajet</h2>
      <DangerAlert
        v-if="isDriverOrPassengerAlreadyBooked"
        :error="isDriverOrPassengerAlreadyBooked"
      />

      <form>
        <div class="mb-6 flex items-center">
          <div class="flex-1">
            <AutoComplete
              name="Lieu de départ"
              :initial-city="trip.departure_location"
              @citySelected="(e) => (trip.departure_location = e)"
            />
            <p
              v-if="formErrors && formErrors['departure_location.name']"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {{ formErrors['departure_location.name'] }}
            </p>
          </div>
          <div class="ml-8 flex-1">
            <AutoComplete
              name="Lieu d'arrivée"
              :initial-city="trip.arrival_location"
              @citySelected="(e) => (trip.arrival_location = e)"
            />
            <p
              v-if="formErrors && formErrors['arrival_location.name']"
              class="mt-2 text-sm text-red-600 dark:text-red-500"
            >
              {{ formErrors['arrival_location.name'] }}
            </p>
          </div>
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
          <p
            v-if="formErrors && formErrors.departure_datetime"
            class="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            {{ formErrors.departure_datetime }}
          </p>
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
          <p
            v-if="formErrors && formErrors.max_passengers"
            class="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            {{ formErrors.max_passengers }}
          </p>
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
          <p
            v-if="formErrors && formErrors.price"
            class="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            {{ formErrors.price }}
          </p>
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
          <p
            v-if="formErrors && formErrors.content"
            class="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            {{ formErrors.content }}
          </p>
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
  import DangerAlert from '../components/DangerAlert.vue'
  import { format } from 'date-fns'

  import { formatErrors } from '../services/errors.js'

  export default {
    name: 'UpdateTrip',
    components: {
      AutoComplete,
      NavBar,
      DangerAlert,
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
        isDriverOrPassengerAlreadyBooked: null,
        formErrors: {},
      }
    },
    async mounted() {
      await this.getTrip()
    },
    methods: {
      async getTrip() {
        const result = await axios.get(`trips/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })

        this.trip = result.data
        this.trip.departure_datetime = format(
          new Date(result.data.departure_datetime),
          'yyyy-MM-dd'
        )
      },

      async saveTrip() {
        this.trip.departure_datetime = new Date(
          this.trip.departure_datetime
        ).toISOString()

        try {
          this.formErrors = {}
          this.isDriverOrPassengerAlreadyBooked = null

          await axios.put(`trips/${this.$route.params.id}`, this.trip, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.getters.getToken}`,
            },
          })

          this.$router.push('/dashboard')
          this.$notyf.success('Votre trajet a bien été modifié')
        } catch (error) {
          if (error.response.status === 400) {
            if (
              error.response.data.message.includes('E_DRIVER_ALREADY_BOOKED')
            ) {
              this.isDriverOrPassengerAlreadyBooked =
                'Vous conduisez déjà sur un autre trajet à la même date.'
            } else {
              this.isDriverOrPassengerAlreadyBooked =
                'Vous êtes passager sur un autre trajet à la même date.'
            }

            return
          }

          this.formErrors = formatErrors(error.response.data.errors)
        }
      },
    },
  }
</script>
