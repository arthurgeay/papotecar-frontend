<template>
  <NavBar />
  <div class="hero">
    <div class="hero__container w-full px-2 py-2.5 sm:px-4">
      <h1 class="hero__container__title text-6xl font-bold text-white">
        Conduisez, voyagez,<br />
        papotez !
      </h1>
    </div>
  </div>
  <div class="search">
    <form @submit.prevent="getTrips()">
      <div
        class="search__container max-w-m rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="search__container__input">
          <AutoComplete
            name="Lieu de départ"
            @citySelected="(event) => (start = event.name)"
          ></AutoComplete>
        </div>
        <div class="search__container__input">
          <AutoComplete
            name="Lieu d'arrivée"
            @citySelected="(event) => (end = event.name)"
          ></AutoComplete>
        </div>
        <div class="search__container__input">
          <label
            for="starting-date"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            v-model="date"
            id="starting-date"
            type="date"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>
        <div class="search__container__input">
          <label
            for="number-of-passengers"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <input
            v-model="passengers"
            title="Nombre de passagers"
            id="number-of-passengers"
            type="number"
            placeholder="Nombre de passagers..."
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>
        <div class="search__container__button">
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Recherche
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="result">
    <ResultElement :result="trip" v-for="trip in trips.data" :key="trip" />
    <p
      class="no-result"
      v-if="typeof trips.meta !== 'undefined' && trips.meta.total === 0"
    >
      Aucun résultat
    </p>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  import ResultElement from '../components/ResultElement.vue'
  import AutoComplete from '../components/AutoComplete.vue'
  import axios from 'axios'

  export default {
    name: 'SearchTrip',
    components: {
      NavBar,
      ResultElement,
      AutoComplete,
    },
    data: () => ({
        trips: [],
        start: '',
        end: '',
        date: null,
        passengers: null,
        arrival_datetime: null,
    }),
    methods: {
      async getTrips() {
        let startingDate = null
        if (this.data !== null) {
          const inputData = new Date(this.date)
          startingDate = inputData.toISOString()
        }
        const response = await axios.get(
          `trips?departure_location=${this.start}&arrival_location=${this.end}&departure_datetime=${startingDate}&max_passengers=${this.passengers}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
            },
          }
        )

        this.trips = response.data
      },
    },
  }
</script>

<style>
  .no-result {
    margin: 4rem auto;
    font-size: 2rem;
  }
  .hero {
    background-image: url('/assets/background.png');
    background-color: black;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 50vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 4rem;
  }

  .hero__container__title {
    font-weight: bold;
    margin: 0 auto;
    width: 75vw;
  }

  .search {
    margin-top: -2rem;
  }

  .search__container {
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    width: 75vw;
  }

  .search__container label {
    display: none;
  }

  .search__container__input {
    margin: 0 0.5rem;
  }

  .result {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    min-height: 25rem;
  }

  .result_container {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    width: 75vw;
  }

  @media (max-width: 1200px) {
    .search__container {
      flex-direction: column;
    }

    .search__container__input {
      margin: 1rem 0;
    }
  }
</style>
