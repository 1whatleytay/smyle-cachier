import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: false,
    cashier: false,
  },
  mutations: {
    setSettings(state, value) {
      state.settings = value
    },

    setCashier(state, value) {
      state.cashier = value
    }
  },
  getters: {
    hasSettings(state) {
      return state.settings
    },

    hasCashier(state) {
      return state.cashier
    }
  }
})