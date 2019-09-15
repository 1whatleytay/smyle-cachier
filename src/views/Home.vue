<template>
  <div class="mt-32">
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
        <div class="flex-auto">
          <button class="bg-blue-600 mt-5 rounded-lg py-2 px-4 float-right text-white ml-4"
            v-bind:class="{ 'opacity-50 cursor-not-allowed': order.items.length === 0 }"
            @click="sendOrderDetails">Checkout</button>
          <button class="bg-blue-600 mt-5 rounded-lg py-2 px-4 float-right text-white"
            @click="sendLoyaltyCard">New Card</button>
        </div>
      </div>

      <div class="mb-4" v-if="order.items.length > 0" v-bind:class="{ 'opacity-50': order.lock }">
        <div class="text-xl font-bold">Items</div>
        <div class="border rounded-lg">
          <div v-for="(item, b) of order.items" v-bind:key="b" @click="dropOrder(order, item)"
            class="p-3 hover:bg-red-100 rounded-lg text-xl flex m-2">
            <button class="text-4xl bg-red-600 rounded-lg w-8 h-8 full-image mr-4"
              v-bind:style="{ backgroundImage: `url(${item.picture})` }"></button>
            <div class="w-full flex">
              <div class="w-5/6">{{ item.name }}</div>
              <div class="w-1/6 text-right text-gray-700">${{ item.cost.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="order.recommendations.length > 0 && !order.lock">
        <div class="text-xl font-bold">Recommendations</div>
        <div class="border rounded-lg">
          <div v-for="(item, b) of order.recommendations" v-bind:key="b" @click="makeOrder(order, item)"
            class="p-3 hover:bg-blue-100 rounded-lg text-xl flex m-2">
            <button class="text-4xl bg-blue-600 rounded-lg w-8 h-8 full-image mr-4"
              v-bind:style="{ backgroundImage: `url(${item.picture})` }"></button>
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

<style>
.full-image {
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

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
    nav.commit('setCashier', false)
  },

  beforeDestroy() {
    if (this.socket) {
      this.socket.close()
    }
  },

  computed: {
    currentOrder() {
      return this.orders[0]
    }
  },

  methods: {
    test() {
      this.orders.unshift({
        name: 'Jimmy John',
        items: [ ],
        recommendations: user.getters.getMenu,
        lock: false,
        hasPaid: false,
      })
    },

    connect() {
      this.socket = new WebSocket('ws://34.66.144.105/cashier')

      this.socket.addEventListener('open', () => { console.log('Socket is open!') })
      this.socket.addEventListener('error', () => { console.log('A socket error occured!') })
      this.socket.addEventListener('message', (e) => { this.createOrder(e) })
      this.socket.addEventListener('close', () => { console.log('Socket closed.') })
    },

    createOrder(event) {
      if (event.data === 'Success.') {
        this.currentOrder.hasPaid = true
        return
      }

      const data = JSON.parse(event.data)

      this.orders.unshift({
        name: data.name,
        recommendations: user.getters.getMenu,
        items: [],
        lock: false,
        hasPaid: false,
        hasLoyalty: false,
      })
    },

    sendOrderDetails() {
      if (this.currentOrder.items.length > 0 && !this.currentOrder.lock) {
        this.socket.send(JSON.stringify(this.currentOrder.items.map(x => {
          return {name: x.name, cost: x.cost }
        })))
        this.currentOrder.lock = true
      }
    },

    sendLoyaltyCard() {
      if (!this.currentOrder.hasLoyalty) {
        this.socket.send('Fredbuck\'s Rewards')
      }
    },

    makeOrder(order, item) {
      if (order.lock) {
        return
      }

      order.recommendations = order.recommendations.filter(a => a != item)
      order.items.push(item)
    },

    dropOrder(order, item) {
      if (order.lock) {
        return
      }

      order.items = order.items.filter(a => a != item)
      order.recommendations.unshift(item)
    }
  }
}
</script>