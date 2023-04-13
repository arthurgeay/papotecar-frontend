<template>
    <div class="messages">
        <NavBar />
        <div class="messages-container">
            <div v-for="message in messages" id="toast-simple" :key="message" :class="initialId
                === message.user_id ? 'conductor' : 'other'" class="toast-simple flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                <div class="text-sm font-normal">{{ message.content }}
                </div>
                <div class="toast-hour">
                    <div class="toast-hour-name">{{ message.user.fullname }}</div>
                    <div class="toast-hour-heure">{{ message.created_at.split('T')[1].substring(0, 5) }}</div>
                </div>
            </div>
        </div>
        <div class="messages-send">
            <form @submit.prevent="submitForm">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <input id="default-search" v-model="write" type="search" class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrez votre message..." required>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Envoyer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Pusher from "pusher-js";
import NavBar from "../components/NavBar.vue";

export default {
    name: "MessagesView",
    components: {
        NavBar,
    },
    data: () => ({
        tripId: "",
        messages: [],
        write: '',
        initialId: ''
    }),
    mounted() {
        this.tripId = this.$route.params.id;
        // this.initPusher();
        this.getMessages();
        // this.getNewMessages();
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: "eu",
        })
        const channel = pusher.subscribe(this.tripId);
        channel.bind("newMessage", (data) => {
            this.messages.push(data.message)
        });
    },
    onDestroy() {
        this.pusher.disconnect();
    },
    methods: {
        getMessages() {
            fetch(`${import.meta.env.VITE_BASE_URL}trips/${this.tripId}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$store.getters.getToken}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.messages = data;
                    this.initialId = data[0].user_id;
                })
        },
        submitForm() {
            fetch(`${import.meta.env.VITE_BASE_URL}trips/${this.tripId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$store.getters.getToken}`,
                },
                body: JSON.stringify({
                    content: this.write
                })
            })
                .then(() => {
                    this.write = '';
                })
        }
    }
};
</script>

<style>
nav {
    position: static !important;
}

.toast-simple {
    margin: .5rem 0;
    position: relative;
    margin-top: 2rem;
}

.toast-hour {
    position: absolute;
    right: -2.5rem;
    font-size: 12px;
    bottom: 0;
    border: none !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: .3rem 0
}

.other {
    margin-left: auto;

}

.other .toast-hour {
    right: initial;
    text-align: right;
    left: -4.5rem;
}

.messages-container {
    margin: 50px 2rem 8rem 2rem;
}

.messages-send {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    background-color: #111928;
}
</style>