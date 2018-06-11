import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    isUserLoggedIn: false
  },
  mutations: {
    setUser (state, data) {
      if (data) {
        state.token = data.key
        state.isUserLoggedIn = !!(data)
      }
    },
    logout (state) {
      state.token = null
      state.isUserLoggedIn = false
    }
  },
  actions: {
    setUser ({commit}, data) {
      commit('setUser', data)
    },
    logout ({commit}) {
      commit('logout')
    }
  }
})
