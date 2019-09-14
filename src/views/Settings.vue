<template>
  <div class="text-center mt-8">
    <div class="big-circle bg-blue-200 w-full"></div>
    <div class="big-text mx-auto">
      <img class="w-full big-image mb-8" src="../assets/growth.svg"/>
      <div class="text-5xl font-bold">Welcome to Anayltics.</div>
      <div class="text-2xl">Find all the important details about your business right here.</div>
    </div>

    <canvas ref="revenue" class="w-2/3 h-64"></canvas>
  </div>
</template>

<style>
.big-circle {
  width: 38rem;
  height: 38rem;

  margin: -80px auto 0px auto;

  border-radius: 9999px;
}

.big-image {
  height: 32rem;
}

.big-text {
  top: -32rem;

  position: relative;
}
</style>

<script>
import nav from '../scripts/nav'

export default {
  name: 'Settings',

  data() {
    return {
      revenue: 100
    }
  },

  mounted() {
    nav.commit('setSettings', false)
    nav.commit('setCachier', true)
  }
}
</script>