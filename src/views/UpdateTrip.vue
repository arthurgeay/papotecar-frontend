<template>
<NavBar />
<div class="create-trip flex justify-center items-center w-screen h-screen">
    <div class="block lg:w-2/6 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h2 class="text-gray-500 dark:text-gray-400 text-2xl">Mdifier un trajet</h2>
        <form>
            <div class="flex items-center mb-6">
                <InputAutocomplete
                    name="Lieu de départ"
                    class="flex-1"
                    :lasted-city="trip.departure_location.name"
                    @citySelected="(e) => (trip.departure_location = e)"
                />
                <InputAutocomplete
                    name="Lieu d'arrivée"
                    class="ml-8 flex-1"
                    :lasted-city="trip.arrival_location.name"
                    @citySelected="(e) => (trip.arrival_location = e)"
                />
            </div>

            <div class="relative mb-6">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
                <input
                    datepicker 
                    type="text" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Date de départ">
            </div>

            <div class="mb-6">
                <label for="max_passengers" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nbr de passagers max</label>
                <input 
                    id="max_passengers" 
                    v-model="trip.max_passengers" 
                    type="number" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required>
            </div>

            <div class="mb-6">
                <label 
                    for="price" 
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                <input 
                    id="price" 
                    v-model="trip.price" 
                    type="number" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required>
            </div>

            <div class="mb-6">
                <label 
                    for="message" 
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre message</label>
                <textarea id="message" v-model="trip.content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ecrivez ici..."></textarea>
            </div>

            <button 
                type="button" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                @click="saveTrip">Enregistrer</button>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'
import InputAutocomplete from '../components/InputAutocomplete.vue'

export default {
    name: 'UpdateTrip',
    components: {
        InputAutocomplete,
        NavBar
    },
    data() {
        return {
            trip: {
                departure_location: {
                    name: "",
                    coordinates: {
                        latitude: 0.0,
                        longitude: 0.0
                    }
                },
                arrival_location: {
                    name: "",
                    coordinates: {
                        latitude: 0.0,
                        longitude: 0.0
                    }
                },
                departure_datetime: null,
                max_passengers: 0,
                price: 0.0,
                content: ""
            }
        }
    },
    methods: {
        getTrip() {
            axios.get(`${import.meta.env.API_PAPOTECAR}/trips`)
                .then(res => this.trip = res.data)
        },

        saveTrip() {
            this.trip.departure_datetime = new Date(document.querySelector('.datepicker-input').value).toISOString() || ""
            axios.post(`${import.meta.env.API_PAPOTECAR}/trips`, this.trip , 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$store.getters.getToken}`, 
                    }
                })
                .then(() => {
                    this.$router.push('/')
                })
                .catch(e => console.log('ERROOOOR', e))
        }
    }
}
</script>