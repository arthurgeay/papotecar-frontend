<template>
    <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <main class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col justify-center items-center py-8 px-6 mx-auto md:h-screen">
                <a class="flex justify-center items-center mb-8 text-3xl font-semibold lg:mb-10 dark:text-white" href="/">
                    <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
                        <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
                            <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2740%27%20height=%2742%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;">
                        </span>
                        <img src="/assets/logo.svg" alt="PapoteCar Logo" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: contain;" srcset="/assets/logo.svg 1x, /assets/logo.svg 2x">
                        <noscript></noscript>
                    </span>
                    <span class="ml-3">PapoteCar</span>
                </a>
                
                <div class="justify-center items-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-sm xl:p-0 dark:bg-gray-800">
                    <div class="p-6 w-full sm:p-8 lg:p-10">
                        <h1 class="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">Connexion</h1>
                        <p class="mb-3 text-gray-500 dark:text-gray-400">Content de vous revoir ! Veuillez remplir le formulaire.</p>
                
                        <form class="mt-8">
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input id="email" required="" type="email" name="email" placeholder="name@gmail.com" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="">
                            </div>
                            <div class="mb-6">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                <input id="password" required="" type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="">
                            </div>

                            <div class="flex items-start mb-6">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="font-medium text-gray-900 dark:text-white">Se souvenir de moi</label>
                                </div>
                                <a class="ml-auto text-sm text-blue-700 dark:text-blue-500 hover:underline" href="/forgot-password/">Mot de passe oublié</a>
                            </div>

                            <button class="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 bg-blue-700" type="submit">
                                <span class="flex justify-center items-center">Se connecter</span>
                            </button>
                            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Vous n'avez pas encore de compte ?
                                <a class="ml-1 text-blue-700 hover:underline dark:text-blue-500" href="/inscription/">S'inscrire</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>   
    </div> 
</template>