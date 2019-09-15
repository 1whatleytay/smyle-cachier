<template>
  <div class="mt-16 text-center">
    <div class="text-6xl my-8">Login</div>
    <div class="my-4">
      <input type="text"
        placeholder="User Key"
        class="text-center cold-gray p-2 text-4xl rounded-lg outline-none w-3/4"
        v-model="key">
    </div>
    <button class="bg-blue-700 py-3 px-12 text-2xl text-white rounded-lg" @click="logIn">Go</button>
  </div>
</template>

<script>
import user from '../scripts/user'
import nav from '../scripts/nav'

export default {
  name: 'Home',

  data() {
    return {
      key: ''
    }
  },

  mounted() {
    if (user.getters.isLoggedIn) {
      this.$router.push('home')
    }

    nav.commit('setSettings', false)
    nav.commit('setCashier', false)
  },
  
  methods: {
    logIn() {
      user.commit('logIn')
      this.$router.push('home')
    }
  }
}
</script>