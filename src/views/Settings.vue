<template>
  <div class="text-center mt-8">
    <div class="big-circle rounded-full bg-blue-200 w-full"></div>
    <div class="big-text mx-auto">
      <img class="w-full big-image mb-8" src="../assets/growth.svg"/>
      <div class="text-5xl font-bold">Welcome to Analytics.</div>
      <div class="text-2xl">Find all the important details about your business right here.</div>
    </div>

    <div class="w-3/4 lg:w-2/3 mx-auto push-canvases mt-4">
      <div class="lg:flex mb-8">
        <div class="w-full text-4xl">
          Today's Revenue
          <div class="text-6xl font-bold">${{ currentRevenue.toFixed(2) }}</div>
        </div>
        <div class="w-full text-4xl">
          Today's # of Sales
          <div class="text-6xl font-bold">{{ Math.floor(currentSales) }}</div>
        </div>
      </div>

      <canvas ref="weekStats" class="my-8"></canvas>

      <div class="text-4xl font-bold text-left">Regulars</div>
      <div v-for="(customer, a) of recentCustomers" v-bind:key="a"
        class="shadow-xl my-4 w-full rounded-full flex">
        <div class="rounded-full w-32 h-32 mr-4 profile m-2"
          v-bind:style="{ backgroundImage: `url(${customer.picture})` }"></div>
        <div>
          <div class="text-4xl font-bold">{{ customer.name }}</div>
          <div v-for="(purchase, a) in customer.purchases" v-bind:key="a"
            class="py-1 flex">
            <div class="flex">
              <img src="../assets/check.png" :alt="purchase.name" class="mt-1 mr-1 w-4 h-4"/>
              {{ purchase.name }}
              <div class="text-gray-700 ml-2">${{ purchase.cost.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.big-circle {
  width: 38rem;
  height: 38rem;

  margin: -80px auto 0px auto;
}

.big-image {
  height: 32rem;
}

.big-text {
  top: -32rem;

  position: relative;
}

.profile {
  background-size: cover;
  background-repeat: no-repeat;
  border: 4px;
}

.push-canvases {
  margin-top: -28rem;
}
</style>

<script>
import Chart from 'chart.js'

import nav from '../scripts/nav'

export default {
  name: 'Settings',

  data() {
    return {      
      revenues: [ 1023, 953, 1203, 1163, 1043, 987, 1203 ],
      numberOfSales: [ 121, 92, 143, 110, 120, 87, 130 ],

      recentCustomers: [
        {
          name: 'Fred Gao',
          picture: 'https://cdn.discordapp.com/attachments/617109210190184474/622430106786332692/IMG_0716.jpg',
          purchases: [
            { name: 'Apple', cost: 10.24 },
            { name: 'Peach', cost: 7.99 },
          ]
        },
        {
          name: 'Yash Trivedi',
          picture: 'https://cdn.discordapp.com/attachments/617109210190184474/622429966424080384/eX3cTdY.jpg',
          purchases: [
            { name: 'Pumpkin', cost: 12.45 },
            { name: 'Tomato', cost: 13.45 },
          ]
        }
      ],

      intervalRevenue: 0,
      intervalSales: 0,
      currentRevenue: 0,
      currentSales: 0,

      revenueChart: null,
    }
  },

  mounted() {
    this.updateRevenueGraph()

    this.intervalRevenue = setInterval(() => {
      if (this.currentRevenue < this.revenueToday) {
        this.currentRevenue += this.revenueToday / 100
      } else {
        clearInterval(this.intervalRevenue)
        this.currentRevenue = this.revenueToday
      }
    }, 10)

    this.intervalSales = setInterval(() => {
      if (this.currentSales < this.salesToday) {
        this.currentSales += this.salesToday / 100
      } else {
        clearInterval(this.intervalSales)
        this.currentSales = this.salesToday
      }
    }, 10)

    nav.commit('setSettings', false)
    nav.commit('setCachier', true)
  },

  computed: {
    revenueToday() {
      return this.revenues[this.revenues.length - 1]
    },

    salesToday() {
      return this.numberOfSales[this.numberOfSales.length - 1]
    }
  },

  methods: {
    updateRevenueGraph() {
      const revenueGraph = this.$refs['weekStats']
      const context = revenueGraph.getContext('2d')

      this.revenueChart = new Chart(context, {
        type: 'line',
        data: {
          labels: [ '5 Days Ago', '4 Days Ago', '3 Days Ago', '3 Days Ago', '2 Days Ago', 'Yesterday', 'Today' ],
          datasets: [
            {
              label: 'Revenue',
              data: this.revenues,
              borderColor: '#2C5282',
            },
            {
              label: 'Number of Sales',
              data: this.numberOfSales,
              borderColor: '#90CDF4'
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      })
    }
  }
}
</script>