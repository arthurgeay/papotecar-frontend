<template>
    <NavBar />
    <div class="hero">
        <div class="hero__container px-2 sm:px-4 py-2.5 w-full">
            <h1 class="hero__container__title text-6xl font-bold text-white">Conduisez, voyagez,<br /> papotez !</h1>
        </div>
    </div>
    <div class="search">
        <form @submit.prevent="getTrips()">
            <div class="search__container max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="search__container__input">
                    <label for="starting-location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input v-model="start" id="starting-location" type="text" placeholder="Lieu de départ..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="search__container__input">
                    <label for="ending-location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input v-model="end" id="ending-location" type="text" placeholder="Lieu d'arrivée..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="search__container__input">
                    <label for="starting-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input v-model="date" id="starting-date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="search__container__input">
                    <label for="number-of-passengers" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input v-model="passengers" title="Nombre de passagers" id="number-of-passengers" type="number" placeholder="Nombre de passagers..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div class="search__container__button">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Recherche</button>
                </div>
            </div>
        </form>
    </div>
    <div class="result">
        <ResultElement :result="trip" v-for="trip in trips.data" :key="trip" />
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ResultElement from "../components/ResultElement.vue";

export default {
    name: "SearchTrip",
    data: () => ({
        trips: [],
        start: '',
        end: '',
        date: null,
        passengers: null,
        arrival_datetime: null,
    }),
    components: {
        NavBar,
        ResultElement
    },
    methods: {
        getTrips() {
            let startingDate = null;
            if (this.data !== null) {
                const inputData = new Date(this.date);
                startingDate = inputData.toISOString();
            }
            fetch(`https://papotecar-backend.onrender.com/trips?departure_location=${this.start}&arrival_location=${this.end}&departure_datetime=${startingDate}&max_passengers=${this.passengers}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + 'Y2xma3V2Y29qMDAwMDFoMnlnZno1ODhoeg.6b5PpWkdSiaHwoTwDyhy20N1lwzGhm8b14Fh4YxaMeDwTtr4MVuxx0uaIq0-'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.trips = data;
                })
        }
    }
};
</script>

<style>
.hero {
    background-image: url("/assets/background.png");
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
    margin: 0 .5rem;
}

.result {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
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
}</style>