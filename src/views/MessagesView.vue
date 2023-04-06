<template>
    <div class="messages">
        <NavBar />
        <div class="messages-container">
            <div id="toast-simple" v-for="message in messages" :key="message" class="toast-simple flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                <div class="pl-4 text-sm font-normal">{{ message.content }}</div>
                <div class="toast-hour">{{ message.created_at.split('T')[1].substring(0,8) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
    name: "MessagesView",
    data: () => ({
        tripId: "5950102a-8b09-4de9-af78-ea61c8a9388a",
        messages: [],
    }),
    components: {
        NavBar,
    },
    mounted() {
        this.getMessages();
    },
    methods: {
        getMessages() {
            fetch(`https://${import.meta.env.VITE_URL}/trips/${this.tripId}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + import.meta.env.VITE_TOKEN_API
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.messages = data;
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
}

.toast-hour {
    position: absolute;
    top: -1.5rem;
    font-size: 12px;
}

.messages-container {
    margin: 50px 2rem 0 2rem;
}</style>