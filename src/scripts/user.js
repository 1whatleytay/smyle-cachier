import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    name: 'Fred',
    menu: [
      { name: 'Catte Americano', cost: 7.85, picture: 'https://www.starbucks.com/assets/bd5d1810c0d44ad6b2646e5314975adf.jpg' },
      { name: 'Caramel Macchiatwo', cost: 9.50, picture: 'https://www.starbucks.com/assets/d961948d45114601bad6b6c9d5993afa.jpg' },
      { name: 'Expresso', cost: 9.35, picture: 'https://www.starbucks.com/assets/1f27f23c7ce34126bc0082b1f003c58d.jpg' },
      { name: 'Very Cold Americano', cost: 8.30, picture: 'https://www.starbucks.com/assets/3b80d866490c4e8eb876d1d6a652d67e.jpg' },
      { name: 'Very Cold Salted Mocha', cost: 12.00, picture: 'https://www.starbucks.com/assets/c2fda41ec2f34527937466eff667e46e.jpg' },
      { name: 'Pumpkin Spice Latte', cost: 17.45, picture: 'https://www.starbucks.com/assets/b63dd2c75bba4a53848a17052ab83f2d.jpg' },
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