<template>
  <div class="dashboard">
    <NavBar />
    <section>
      <div class="tripsPassengers-div">
        <h2 class="text-5xl font-extrabold dark:text-white">
          Je suis passager
        </h2>
        <ResultElement
          v-for="trip in tripsAsPassenger"
          :key="trip"
          :result="trip"
        />
      </div>
      <p v-if="tripsAsPassenger.length === 0" class="no-result" color="white">
        Aucun résultat
      </p>
      <div class="tripsDrivers-div">
        <h2 class="text-5xl font-extrabold dark:text-white">
          Je suis conducteur
        </h2>
        <ResultElement
          v-for="trip in tripsAsDriver"
          :key="trip"
          :result="trip"
        />
        <p v-if="tripsAsDriver.length === 0" class="no-result" color="white">
          Aucun résultat
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar.vue'
  import axios from 'axios'
  import ResultElement from '../components/ResultElement.vue'

  export default {
    name: 'DashboardView',
    components: {
      ResultElement,
      NavBar,
    },
    data: () => ({
      tripsAsDriver: [],
      tripsAsPassenger: [],
      user: {},
    }),
    mounted() {
      this.getUserTrips()
    },
    methods: {
      async getUserTrips() {
        const response = await axios.get(`me/trips`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })

        this.tripsAsDriver = response.data.tripsAsDriver
        this.tripsAsPassenger = response.data.tripsAsPassenger
      },
    },
  }
</script>

<style>
  .no-result {
    margin: 4rem auto;
    font-size: 2rem;
  }

  .dashboard section {
    margin: 0 2rem;
    margin-top: 6rem;
  }

  .dashboard h2 {
    margin: 2rem 1.5rem;
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
