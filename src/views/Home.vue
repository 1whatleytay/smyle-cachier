<template>
  <div class="mt-8">
    <div class="text-center" v-if="orders.length === 0">
      <div class="text-5xl font-bold">Welcome {{ name }}!</div>
      <div class="text-2xl" @click="test">Start the day by having one of your customers approach the camera.</div>

      <img src="../assets/empty-orders.svg" class="mx-auto lg:w-1/2 w-3/4">
    </div>
    <div class="text-center text-6xl font-bold" v-if="orders.length > 0">Orders</div>
    <div v-for="(order, a) in orders" v-bind:key="a"
      class="bg-gray-200 mx-auto w-3/4 my-8 rounded-lg p-6">

      <div class="flex">
        <div class="text-5xl font-bold mb-4">{{ order.name }}</div>
        <div class="inline-block w-4 h-4 ml-4 mt-8 rounded-full"
          v-bind:class="{ 'bg-green-500': order.hasPaid, 'bg-gray-700': !order.hasPaid }"></div>
      </div>

      <div class="mb-4" v-if="order.items.length > 0">
        <div class="text-xl font-bold">Items</div>
        <div class="border rounded-lg">
          <div v-for="(item, b) of order.items" v-bind:key="b"
            class="p-3 hover:bg-gray-300 rounded-lg text-xl flex m-2">
            <button class="text-4xl bg-red-600 rounded-lg w-8 h-8 bg-minus mr-4"
              @click="dropOrder(order, item)"></button>
            <div class="w-full flex">
              <div class="w-5/6">{{ item.name }}</div>
              <div class="w-1/6 text-right text-gray-700">${{ item.cost.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="order.recommendations.length > 0">
        <div class="text-xl font-bold">Recommendations</div>
        <div class="border rounded-lg">
          <div v-for="(item, b) of order.recommendations" v-bind:key="b"
            class="p-3 hover:bg-gray-300 rounded-lg text-xl flex m-2">
            <button class="text-4xl bg-blue-600 rounded-lg w-8 h-8 bg-plus mr-4"
              @click="makeOrder(order, item)"></button>
            <div class="w-full flex">
              <div class="w-5/6">{{ item.name }}</div>
              <div class="w-1/6 text-right text-gray-700">${{ item.cost.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from '../scripts/user'
import nav from '../scripts/nav'

export default {
  name: 'Home',

  data() {
    return {
      name: '...',
      orders: [],

      socket: null,
    }
  },

  mounted() {
    this.name = user.getters.getName

    this.connect()

    nav.commit('setSettings', true)
    nav.commit('setCachier', false)
  },

  methods: {
    test() {
      this.orders.push({
        name: 'Jimmy John',
        items: [ ],
        recommendations: user.getters.getMenu,
        hasPaid: false
      })
    },

    connect() {
      this.socket = new WebSocket('ws://34.66.144.105/cashier')

      // () => {} is used for implicit this. Screw bind!
      this.socket.addEventListener('open', () => { console.log('Socket is open!') })
      this.socket.addEventListener('error', () => { console.log('A socket error occured!') })
      this.socket.addEventListener('message', (e) => { this.createOrder(e) })
    },

    createOrder(event) {
      const data = JSON.parse(event.data)

      this.orders.push({
        name: data.name,
        recommendations: user.getters.getMenu
      })
    },

    makeOrder(order, item) {
      order.recommendations = order.recommendations.filter(a => a != item)
      order.items.push(item)
    },

    dropOrder(order, item) {
      order.items = order.items.filter(a => a != item)
      order.recommendations.push(item)
    }
  }
}
</script>