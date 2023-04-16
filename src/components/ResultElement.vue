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
          v-if="
            $store.getters.getUser?.id !== result.driver.id && !imPassengers
          "
          type="button"
          @click="subcribeToTraject"
          class="resultElement_information__button mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            v-if="isLoading"
            aria-hidden="true"
            role="status"
            class="mr-3 inline h-4 w-4 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Réserver
        </button>
        <span
          v-else-if="imDriver"
          class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >Vous êtes le conducteur</span
        >

        <span
          v-else-if="imPassengers"
          class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
          >Vous êtes passager</span
        >
      </div>
    </div>
  </div>
</template>

<script>
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
      imPassengers: false,
      imDriver: false,
      isLoading: false,
    }),
    mounted() {
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

        this.imDriver =
          this.result.driver.id == this.$store.getters.getUser?.id
            ? true
            : false

        this.result.passengers.forEach((pas) => {
          if (this.$store.getters.getUser?.id == pas.id) {
            this.imPassengers = true
          }
        })
      },

      subcribeToTraject: async function () {
        this.isLoading = true

        try {
          const response = await axios.post(
            `trips/${this.result.id}/passengers`,
            null,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getToken}`,
              },
            }
          )

          if (!response.error) {
            this.imPassengers = true
            this.$notyf.success('Votre inscription a bien été prise en compte.')
          }
        } catch (error) {
          console.log('An error occurred.')
        }

        this.isLoading = false
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

  .load-icon {
    font-size: 28px;
    color: #c1c1c1;
    -webkit-animation-name: spinner;
    animation-name: spinner;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }

  @-webkit-keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .check-icon {
    font-size: 32px;
    color: #82cd47;
  }

  .bounceIn {
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn;
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes bounceIn {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }
    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
      -webkit-transform: scale3d(0.9, 0.9, 0.9);
      transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
      -webkit-transform: scale3d(0.97, 0.97, 0.97);
      transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes bounceIn {
    0%,
    20%,
    40%,
    60%,
    80%,
    100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }
    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
      -webkit-transform: scale3d(0.9, 0.9, 0.9);
      transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
      -webkit-transform: scale3d(0.97, 0.97, 0.97);
      transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
</style>
