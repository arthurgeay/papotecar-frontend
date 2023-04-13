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
          data-modal-target="passengers-modal" data-modal-toggle="passengers-modal"
          class="w-full mt-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Passagers
        </button>
        <button
          type="button"
          class="w-full mt-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          @click="goToMessages(result.id)"
        >
          Messagerie
        </button>
        <button
          type="button"
          class="w-full mt-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          @click="updateTrip(result.id)"
        >
          Modifier
        </button>
        <button
          type="button"
          data-modal-target="delete-modal" data-modal-toggle="delete-modal"
          class="w-full mt-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
        >
          Supprimer
        </button>
        
        <div id="passengers-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Terms of Service
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="passengers-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-6 space-y-6">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="passengers-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                        <button data-modal-hide="passengers-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="delete-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="delete-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                        <button @click="deleteTrip(result.id)" data-modal-hide="delete-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button data-modal-hide="delete-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
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
    }),
    mounted() {
        initModals();
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
        const secondes = data.routes[0].duration
        const heures = Math.floor(secondes / 3600)
        const minutes = Math.floor((secondes % 3600) / 60)
        const heureFormat = heures < 10 ? `0${heures}` : heures
        const minuteFormat = minutes < 10 ? `0${minutes}` : minutes
        this.arrival_datetime = `${heureFormat}h${minuteFormat}`
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
        } catch (error) {
          console.log(error)
        }

        this.$router.push('/dashboard')
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
