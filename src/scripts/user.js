import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    name: 'Taylor',
    menu: [
      { name: 'Apple', cost: 7.00 },
      { name: 'Pumpkin', cost: 3.45 },
      { name: 'Cheese', cost: 12.75 }
    ]
  },
  mutations: {
    logIn(state, name, menu) {
      state.loggedIn = true
      state.name = name
      state.menu = menu
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn
    },
    getName(state) {
      return state.name
    },
    getMenu(state) {
      return state.menu
    },
  },

})