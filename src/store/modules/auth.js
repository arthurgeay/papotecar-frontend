import axios from 'axios';
const state = {
    token: null
};
const getters = {
    isAuthenticated: state => !!state.token,
};
const actions = {
    async Register({ dispatch }, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('fullname', form.fullname)
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },
    async LogIn({ commit }, User) {
        await axios.post('login', User)
        await commit('setUser', User.get('fullname'))
        this.$router.push('/')
    },
    async LogOut({ commit }) {
        let user = null
        commit('logout', user)
    }
};
const mutations = {
    setUser(state, fullname) {
        state.user = fullname
    },
    LogOut(state) {
        state.user = null
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
