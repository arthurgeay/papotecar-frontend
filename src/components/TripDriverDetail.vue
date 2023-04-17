<template>
  <div class="resultElement">
    <div
      class="resultElement__frame max-w-m rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <ol
        class="resultElement__container relative border-l border-gray-200 dark:border-gray-700"
      >
        <li class="mb-10 ml-6">
          <span
            class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900"
          >
            <svg
              aria-hidden="true"
              class="h-3 w-3 text-blue-800 dark:text-blue-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <h3
            class="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white"
          >
            {{ departure_datetime }}
          </h3>
          <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            {{ result.departure_location.name }}
          </p>
        </li>
        <li class="ml-6">
          <span
            class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900"
          >
            <svg
              aria-hidden="true"
              class="h-3 w-3 text-blue-800 dark:text-blue-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <h3
            class="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white"
          >
            {{ arrival_datetime }}
          </h3>
          <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            {{ result.arrival_location.name }}
          </p>
        </li>
      </ol>
      <div class="resultElement_trip">
        <div class="resultElement_trip__passagers">
          <p class="font-bold">Nombre de passagers maximum</p>
          <p class="number">{{ result.max_passengers }}</p>
        </div>
        <div class="resultElement_trip__date">
          <p class="font-bold">Date de départ</p>
          <p>
            {{ new Date(result.departure_datetime).toLocaleDateString() }}
          </p>
        </div>
        <div class="resultElement_trip__price">
          <p class="font-bold">Prix</p>
          <p class="price">{{ result.price }}€</p>
        </div>
        <div class="resultElement_trip__description">
          <p class="font-bold">Description</p>
          <p class="description">{{ result.content }}</p>
        </div>
      </div>

      <div class="resultElement_information v">
        <div
          class="resultElement_information__container rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="resultElement_information__container__profilePicture">
            <img
              :src="'https://i.pravatar.cc/150?u=' + result.driver.id"
              alt="profile picture"
            />
          </div>
          <div class="resultElement_information__container__name">
            <p>{{ result.driver.fullname }}</p>
          </div>
        </div>
        <button
          type="button"
          :data-modal-target="`passengers-modal-${result.id}`"
          :data-modal-toggle="`passengers-modal-${result.id}`"
          @click="getTrip(result.id)"
          class="mt-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Passagers
        </button>
        <button
          type="button"
          class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          @click="goToMessages(result.id)"
        >
          Messagerie
        </button>
        <button
          type="button"
          class="mt-2 w-full rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          @click="updateTrip(result.id)"
        >
          Modifier
        </button>
        <button
          type="button"
          :data-modal-target="`delete-modal-${result.id}`"
          :data-modal-toggle="`delete-modal-${result.id}`"
          class="mt-2 w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
        >
          Supprimer
        </button>

        <div
          :id="`passengers-modal-${result.id}`"
          tabindex="-1"
          aria-hidden="true"
          class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
        >
          <div class="relative max-h-full w-full max-w-2xl">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
              <div
                class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600"
              >
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Passagers
                </h3>
                <button
                  type="button"
                  class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  :data-modal-hide="`passengers-modal-${result.id}`"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="space-y-6 p-6">
                <p v-if="trip?.passengers.length === 0">
                  Pas de passager pour le moment.
                </p>
                <div
                  v-if="trip?.passengers.length > 0"
                  class="relative overflow-x-auto shadow-md sm:rounded-lg"
                >
                  <table
                    class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
                  >
                    <thead
                      class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <tr>
                        <th scope="col" class="px-6 py-3">Nom du passager</th>
                        <th scope="col" class="px-6 py-3">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="passenger in trip.passengers"
                        :key="passenger.id"
                        class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {{ passenger.fullname }}
                        </th>
                        <td class="px-6 py-4 text-right">
                          <div v-if="!passenger.is_approved">
                            <a
                              href="#"
                              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                              @click="approvePassenger(passenger.id)"
                              >Accepter</a
                            >
                            |
                            <a
                              href="#"
                              class="font-medium text-red-600 hover:underline dark:text-red-500"
                              @click="refusePassenger(passenger.id)"
                              >Refuser</a
                            >
                          </div>
                          <span
                            v-else
                            class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                            >Approuvé</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
              >
                <button
                  :data-modal-hide="`passengers-modal-${result.id}`"
                  type="button"
                  class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          :id="`delete-modal-${result.id}`"
          tabindex="-1"
          class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
        >
          <div class="relative max-h-full w-full max-w-md">
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                :data-modal-hide="`delete-modal-${result.id}`"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-6 text-center">
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3
                  class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                >
                  Êtes vous sûr de vouloir supprimer ce trajet ?
                </h3>
                <button
                  @click="deleteTrip(result.id)"
                  :data-modal-hide="`delete-modal-${result.id}`"
                  type="button"
                  class="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                >
                  Supprimer le trajet
                </button>
                <button
                  :data-modal-hide="`delete-modal-${result.id}`"
                  type="button"
                  class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { initModals } from 'flowbite'
  import axios from 'axios'

  export default {
    name: 'ResultElement',
    props: {
      result: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      arrival_datetime: '00h00',
      departure_datetime: '00h00',
      trip: null,
    }),
    mounted() {
      initModals()

      const res = JSON.parse(JSON.stringify(this.result))
      this.departure_datetime =
        res.departure_datetime.split('T')[1].split(':')[0] +
        'H' +
        res.departure_datetime.split('T')[1].split(':')[1]
      this.getData(res)
    },
    methods: {
      getData: async function (res) {
        const coordinates = `${res.departure_location.coordinates.longitude},${res.departure_location.coordinates.latitude};${res.arrival_location.coordinates.longitude},${res.arrival_location.coordinates.latitude}`
        const result = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?alternatives=false&geometries=geojson&language=fr-FR&overview=simplified&steps=true&access_token=${
            import.meta.env.VITE_API_MAPBOX_ACCESS_TOKEN
          }`
        )

        const data = await result.json()
        const durationSeconds = data.routes[0].duration
        const durationMinutes = Math.floor(durationSeconds / 60)
        const [hours1, minutes1] = [
          Math.floor(durationMinutes / 60),
          durationMinutes % 60,
        ]
        const [hours2, minutes2] = this.departure_datetime
          .split('H')
          .map(Number)

        const totalMinutes = (hours1 + hours2) * 60 + minutes1 + minutes2
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        this.arrival_datetime = `${hours.toString().padStart(2, '0')}h${minutes
          .toString()
          .padStart(2, '0')}`
      },

      goToMessages(tripId) {
        this.$router.push(`messages/${tripId}`)
      },

      async updateTrip(tripId) {
        this.$router.push(`trips/${tripId}`)
      },
      async deleteTrip(tripId) {
        try {
          await axios.delete(`trips/${tripId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.getters.getToken}`,
            },
          })

          this.$router.go(0)
        } catch (error) {
          console.log(error)
        }
      },
      async approvePassenger(passengerId) {
        await axios.put(
          `trips/${this.result.id}/passengers/${passengerId}/approve`,
          null,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        )

        await this.getTrip(this.result.id)

        this.$notyf.success('Passager accepté')
      },
      async refusePassenger(passengerId) {
        await axios.delete(
          `trips/${this.result.id}/passengers/${passengerId}/disapprove`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        )

        await this.getTrip(this.result.id)

        this.$notyf.success('Passager supprimé')
      },
      async getTrip(tripId) {
        const result = await axios.get(`trips/${tripId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })

        this.trip = result.data
      },
    },
  }
</script>

<style>
  .resultElement {
    color: white;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
  }

  .resultElement__frame {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  @media (max-width: 600px) {
    .resultElement__frame {
      flex-direction: column;
    }
    .resultElement__container {
      display: flex;
      justify-content: space-between;
      border: none;
    }
    .resultElement__container .ml-6:not(.mb-10) {
      order: 2;
    }
    .resultElement__container::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin: 1rem;
      border: 1px solid #e5e7eb;
    }
  }

  @media (max-width: 1200px) and (min-width: 600px) {
    .resultElement__frame {
      display: grid;
      grid-template-columns: 10rem 1fr;
    }
  }
  .resultElement__container,
  .resultElement_trip {
    margin: 0 1rem;
  }

  .resultElement_trip {
    flex: 1;
  }

  .resultElement_trip > div:not(:last-child) {
    margin-bottom: 1rem;
  }

  .resultElement_information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .resultElement_information__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .resultElement_information__button {
    margin-top: 1rem;
  }

  .resultElement_information__container__profilePicture {
    display: flex;
    justify-content: center;
    min-width: 5rem;
    height: 5rem;
    width: 5rem;
  }

  .resultElement_information__container__name {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }

  .resultElement_information__container img {
    border-radius: 50%;
  }

  @media (max-width: 1200px) {
    .resultElement__frame {
      flex-direction: column;
    }

    .resultElement_trip {
      margin: 0;
    }

    .resultElement_information {
      margin-top: 1rem;
    }
  }
</style>
