<template>
    <NavBar/>
    <div class="hero">
        <div class="hero__container px-2 sm:px-4 py-2.5 fixed w-full">
            <h1 class="hero__container__title text-4xl font-bold text-white">Conduisez, voyagez,<br/> papotez !</h1>
        </div>
    </div>
    <div class="search">
        <div class="search__container max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="search__container__input">
                <label for="starting-location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input id="starting-location" type="text" placeholder="Starting location..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="search__container__input">
                <label for="ending-location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input id="ending-location" type="text" placeholder="Ending location..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="search__container__input">
                <label for="starting-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input id="starting-date" type="date" placeholder="Starting date..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="search__container__input">
                <label for="number-of-passengers"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input id="number-of-passengers" type="number" placeholder="Number of passengers..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="search__container__button">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Recherche</button>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
    name: "SearchTrip",
    components: {
        NavBar
    },
};
</script>

<style>
.hero {
    background-image: url("../assets/background.png");
    background-color: black;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 40vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.hero__container__title {
    font-weight: bold;
    font-size: 3rem;
    margin-left: 4rem;
}
.search__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
}
.search__container__input {
    margin: 0 .5rem;
}
</style>