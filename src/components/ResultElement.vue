<template>
    <div class="resultElement">
        <!-- add hour of departure, hour of arrival, starting location, ending location, name of the conductor and the profile picture of the conductor -->
        <ol class="resultElement__container relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-6">
                <span
                    class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
                    <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
                <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">20H32
                </h3>
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Paris</p>
            </li>
            <li class="ml-6">
                <span
                    class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
                    <svg aria-hidden="true" class="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
                <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">23H45
                </h3>
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Dijon</p>
            </li>
        </ol>
        
        <div class="resultElement_information">
            <div class="resultElement_information__container">
                <div class="resultElement_information__container__profilePicture">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="profile picture">
                </div>
                <div class="resultElement_information__container__name">
                    <p>Didier</p>
                </div>
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
    }
};
</script>

<style>
.resultElement {
    color: white;
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.resultElement_information {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.resultElement_information__container__profilePicture {
    display: flex;
    justify-content: center;
}
.resultElement_information__container__name {
    display: flex;
    margin-top: 1rem;
}
.resultElement_information__container img {
    border-radius: 50%;
}
</style>