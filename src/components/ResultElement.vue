<template>
    <div class="resultElement">
        <div class="resultElement__frame max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <ol class="resultElement__container relative border-l border-gray-200 dark:border-gray-700">
                <li class="mb-10 ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
                        <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{{ departure_datetime }}</h3>
                    <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{{ result.departure_location.name }}</p>
                </li>
                <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
                        <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{{ arrival_datetime }}
                    </h3>
                    <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{{ result.arrival_location.name }}</p>
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
                <div class="resultElement_information__container bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div class="resultElement_information__container__profilePicture">
                        <img :src="'https://i.pravatar.cc/150?u=' + result.driver.id" alt="profile picture">
                    </div>
                    <div class="resultElement_information__container__name">
                        <p>{{ result.driver.fullname }}</p>
                    </div>
                </div>
                <button type="button" class="w-full resultElement_information__button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Réserver</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResultElement",
    props: {
        result: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        arrival_datetime: '00h00',
        departure_datetime: '00h00'
    }),
    mounted() {
        const res = JSON.parse(JSON.stringify(this.result))
        this.departure_datetime = res.departure_datetime.split("T")[1].split(":")[0] + "H" + res.departure_datetime.split("T")[1].split(":")[1];
        this.getData(res);
    },
    methods: {
        getData: async function (res) {
            const coordinates = `${res.departure_location.coordinates.longitude},${res.departure_location.coordinates.latitude};${res.arrival_location.coordinates.longitude},${res.arrival_location.coordinates.latitude}`;
            const result = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?alternatives=false&geometries=geojson&language=fr-FR&overview=simplified&steps=true&access_token=${import.meta.env.VITE_API_MAPBOX_ACCESS_TOKEN
                }`
            );

            const data = await result.json();
            const secondes = data.routes[0].duration;
            const heures = Math.floor(secondes / 3600);
            const minutes = Math.floor((secondes % 3600) / 60);
            const heureFormat = heures < 10 ? `0${heures}` : heures;
            const minuteFormat = minutes < 10 ? `0${minutes}` : minutes;
            this.arrival_datetime = `${heureFormat}h${minuteFormat}`
        }
    }
};
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
        content: "";
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

.resultElement_trip>div:not(:last-child) {
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
    border-radius: .5rem;
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