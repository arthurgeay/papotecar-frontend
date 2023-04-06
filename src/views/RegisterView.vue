<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
    <main class="bg-gray-50 dark:bg-gray-900">
      <div
        class="mx-auto flex flex-col items-center justify-center py-8 px-6 md:h-screen"
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
              Inscription
            </h1>
            <p class="mb-3 text-gray-500 dark:text-gray-400">
              Rejoignez le réseau de covoiturage gratuitement !
            </p>
            <form class="mt-8" @submit.prevent="onRegister">
              <div class="mb-6">
                <label
                  for="fullname"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Nom</label
                >
                <input
                  id="fullname"
                  v-model="form.fullname"
                  required=""
                  type="text"
                  name="fullname"
                  placeholder="Didier Le Tronçonneur"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                />
              </div>
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
              </div>

              <div class="mb-6 flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="terms"
                    required=""
                    aria-describedby="terms"
                    name="terms"
                    type="checkbox"
                    class="focus:ring-3 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-medium text-gray-900 dark:text-white"
                  >
                    J'accepte les
                    <a
                      class="ml-1 text-blue-700 hover:underline dark:text-blue-500"
                      href="/terms-and-conditions/"
                      >conditions d'utilisations</a
                    >
                  </label>
                </div>
              </div>

              <button
                class="mb-6 w-full rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white sm:w-auto"
                type="submit"
              >
                <span class="flex items-center justify-center">S'inscrire</span>
              </button>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte ?
                <router-link
                  class="ml-1 text-blue-700 hover:underline dark:text-blue-500"
                  to="login"
                  >Se connecter</router-link
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

  export default {
    data() {
      return {
        form: {
          fullname: '',
          email: '',
          password: '',
        },
        showError: false,
      }
    },
    methods: {
      ...mapActions(['register']),
      async onRegister() {
        try {
          await this.register(this.form)
          this.$router.push('/')
          this.showError = false
        } catch (error) {
          this.showError = true
        }
      },
    },
  }
</script>
