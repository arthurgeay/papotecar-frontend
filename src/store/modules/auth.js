import axios from 'axios'
const state = {
  token: null,
  user: null,
}
const getters = {
  isAuthenticated: (state) => !!state.token,
  getToken: (state) => state.token,
  getUser: (state) => state.user,
}
const actions = {
  async register({ commit, dispatch }, form) {
    const response = await axios.post('register', form)

    commit('setToken', response.data.token)
    dispatch('me')
  },
  async login({ commit, dispatch }, form) {
    const response = await axios.post('login', form)

    await commit('setToken', response.data.token)
    dispatch('me')
  },
  async logout({ state, commit }) {
    await axios.post('logout', null, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    commit('setToken', null)
    commit('setUser', null)
  },
  async me({ state, commit }) {
    const userResponse = await axios.get('me', {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })

    commit('setUser', userResponse.data)
  },
}
const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}
