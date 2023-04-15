<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
    <main class="bg-gray-50 dark:bg-gray-900">
      <div
        class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen"
      >
        <a
          class="mb-8 flex items-center justify-center text-3xl font-semibold dark:text-white lg:mb-10"
          href="/"
        >
          <span
            style="
              box-sizing: border-box;
              display: inline-block;
              overflow: hidden;
              width: initial;
              height: initial;
              background: none;
              opacity: 1;
              border: 0px;
              margin: 0px;
              padding: 0px;
              position: relative;
              max-width: 100%;
            "
          >
            <span
              style="
                box-sizing: border-box;
                display: block;
                width: initial;
                height: initial;
                background: none;
                opacity: 1;
                border: 0px;
                margin: 0px;
                padding: 0px;
                max-width: 100%;
              "
            >
              <img
                alt=""
                aria-hidden="true"
                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2740%27%20height=%2742%27/%3e"
                style="
                  display: block;
                  max-width: 100%;
                  width: initial;
                  height: initial;
                  background: none;
                  opacity: 1;
                  border: 0px;
                  margin: 0px;
                  padding: 0px;
                "
              />
            </span>
            <img
              src="/assets/logo.svg"
              alt="PapoteCar Logo"
              style="
                position: absolute;
                inset: 0px;
                box-sizing: border-box;
                padding: 0px;
                border: none;
                margin: auto;
                display: block;
                width: 0px;
                height: 0px;
                min-width: 100%;
                max-width: 100%;
                min-height: 100%;
                max-height: 100%;
                object-fit: contain;
              "
              srcset="/assets/logo.svg 1x, /assets/logo.svg 2x"
            />
            <noscript></noscript>
          </span>
          <span class="ml-3">PapoteCar</span>
        </a>

        <div
          class="w-full items-center justify-center rounded-lg bg-white shadow dark:bg-gray-800 md:mt-0 lg:flex lg:max-w-screen-sm xl:p-0"
        >
          <div class="w-full p-6 sm:p-8 lg:p-10">
            <h1
              class="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl"
            >
              Connexion
            </h1>
            <p class="mb-3 text-gray-500 dark:text-gray-400">
              Content de vous revoir ! Veuillez remplir le formulaire.
            </p>

            <div
              v-if="globalError"
              class="mb-4 flex rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                aria-hidden="true"
                class="mr-3 inline h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Info</span>
              <div>
                {{ globalError }}
              </div>
            </div>

            <form class="mt-8" @submit.prevent="onLogin">
              <div class="mb-6">
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  required=""
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
                <p
                  v-if="formErrors && formErrors.email"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ formErrors.email }}
                </p>
              </div>
              <div class="mb-6">
                <label
                  for="password"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Mot de passe</label
                >
                <input
                  id="password"
                  v-model="form.password"
                  required=""
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
                <p
                  v-if="formErrors && formErrors.password"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ formErrors.password }}
                </p>
              </div>

              <button
                class="mb-6 w-full rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white sm:w-auto"
                type="submit"
              >
                <span class="flex items-center justify-center"
                  >Se connecter</span
                >
              </button>

              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Vous n'avez pas encore de compte ?
                <router-link
                  class="ml-1 text-blue-700 hover:underline dark:text-blue-500"
                  to="register"
                  >S'inscrire</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { formatErrors } from '../services/errors.js'

  export default {
    name: 'LoginView',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        formErrors: {},
        globalError: null,
      }
    },
    methods: {
      ...mapActions(['login']),
      async onLogin() {
        try {
          await this.login(this.form)
          this.$router.push('/')
          this.showError = false
        } catch (error) {
          if (error.response) {
            if (error.response.status === 400) {
              this.globalError = 'Email ou mot de passe incorrect'
              return
            }

            this.formErrors = formatErrors(error.response.data.errors)
          }
        }
      },
    },
  }
</script>
