import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: false,
    cachier: false,
  },
  mutations: {
    setSettings(state, value) {
      state.settings = value
    },

    setCachier(state, value) {
      state.cachier = value
    }
  },
  getters: {
    hasSettings(state) {
      return state.settings
    },

    hasCachier(state) {
      return state.cachier
    }
  }
})