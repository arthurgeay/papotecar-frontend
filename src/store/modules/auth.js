import axios from 'axios'
const state = {
  token: null,
}
const getters = {
  isAuthenticated: (state) => !!state.token,
}
const actions = {
  async register({ commit }, form) {
    const response = await axios.post('register', form)

    commit('setToken', response.data.token)
  },
  async login({ commit }, form) {
    const response = await axios.post('login', form)
    await commit('setToken', response.data.token)
  },
  async logout({ state, commit }) {
    await axios.post('logout', null, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    commit('setToken', null)
  },
}
const mutations = {
  setToken(state, token) {
    state.token = token
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
