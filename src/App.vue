<template>
  <div id="app">
    <div class="bg-blue-500 w-full nav-z"
      v-bind:class="{ 'h-2': !settings && !cashier, 'h-16': settings || cashier }">
      <router-link tag="div" to="/settings" v-if="settings">
        <img class="w-16 h-16 float-right cursor-pointer" src="./assets/settings.png"/>
      </router-link>
      <router-link tag="div" to="/home" v-if="cashier">
        <img class="w-16 h-16 float-right cursor-pointer" src="./assets/cashier.png">
      </router-link>
      <router-link tag="div" to="/" v-if="settings || cashier">
        <img src="./assets/smyle-white.png" alt="Smyle" class="h-16 cursor-pointer"/>
      </router-link>
    </div>
    <div v-bind:class="{ 'mb-2': !settings && !cashier, 'mb-16': settings || cashier }">
      <!-- Just Padding -->
    </div>
    <router-view/>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css?family=Manjari&display=swap'); */
@import url('https://fonts.googleapis.com/css?family=PT+Serif&display=swap');

div {
  /* font-family: 'Helvetica', sans-serif; */
  font-family: 'PT Serif', serif;
}

.nav-z {
  top: 0px;

  position: fixed;
  z-index: 10;
}

.cold-gray {
  background-color: #D8D8E8;
}

.warm-gray {
  background-color: #F0E8E2;
}

.bg-plus {
  background-image: url('./assets/plus.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bg-minus {
  background-image: url('./assets/minus.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>

<script>
import nav from './scripts/nav'

export default {
  name: 'App',

  computed: {
    settings() {
      return nav.getters.hasSettings
    },
    cashier() {
      return nav.getters.hasCashier
    }
  }
}
</script>