<template>
  <nav
    class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white px-2 py-2.5 dark:border-gray-600 dark:bg-gray-900 sm:px-4"
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <a href="#" class="flex items-center">
        <img
          src="/assets/logo.svg"
          class="mr-3 h-6 sm:h-9"
          alt="PapoteCar Logo"
        />
        <span
          class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          >PapoteCar</span
        >
      </a>

      <div class="flex md:order-2">
        <button
          id="user-menu-button"
          type="button"
          class="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="h-8 w-8 rounded-full"
            :src="`https://i.pravatar.cc/150?u=${$store.getters.getUser?.id}`"
            alt="user photo"
          />
        </button>
        <!-- Dropdown menu -->
        <div
          id="user-dropdown"
          class="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{
              $store.getters.getUser?.fullname
            }}</span>
            <span
              class="block truncate text-sm text-gray-500 dark:text-gray-400"
              >{{ $store.getters.getUser?.email }}</span
            >
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                @click.prevent="disconnect"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >Déconnexion</a
              >
            </li>
          </ul>
        </div>

        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div
        id="navbar-sticky"
        class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
      >
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900"
        >
          <router-link
            to="/"
            class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            >Rechercher un trajet</router-link
          >
          <li>
            <router-link
              to="/"
              class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
              >Tableau de bord</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapActions } from 'vuex'
  import { initDropdowns, initCollapses } from 'flowbite'
  export default {
    name: 'NavBar',
    mounted() {
      initDropdowns()
      initCollapses()
    },
    methods: {
      ...mapActions(['logout']),
      async disconnect() {
        await this.logout()
        this.$router.push('/login')
      },
    },
  }
</script>
