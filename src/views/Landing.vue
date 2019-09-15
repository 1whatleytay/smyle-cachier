<template>
  <div class="bg-blue-100">
    <div class="w-full heading-picture"></div>
    <div class="bg-blue-500 mx-auto w-2/3 rounded-lg lg:-mt-48 -mt-32 mb-16 rounder">
      <img src="../assets/smyle-white-slogan.png" alt="Smyle" class="mx-auto">
    </div>
    <div class="w-5/6 mx-auto flex flex-wrap mb-16">
      <img src="../assets/wallet.svg" alt="Wallet" class="w-full lg:w-3/5">
      <div class="w-full lg:w-2/5 bg-white rounded-lg p-4 text-2xl">
        <div class="text-center text-5xl font-bold mb-8">Don't let your wallet weigh you down.</div>
        <span class="font-bold">Smyle</span> invisions a world where:

        <div class="flex">
          <img src="../assets/check.png" alt="Check" class="w-4 h-4 mt-2 mx-4"/>
            There's no need to bring around pounds of cards or download a bunch of apps.
        </div>
        <div class="flex">
          <img src="../assets/check.png" alt="Check" class="w-4 h-4 mt-2 mx-4"/>
            Customer/client interactions are outstanding.
        </div>
        <div class="flex">
          <img src="../assets/check.png" alt="Check" class="w-4 h-4 mt-2 mx-4"/>
            Lines are fast and hassle free.
        </div>
        <div class="flex">
          <img src="../assets/check.png" alt="Check" class="w-4 h-4 mt-2 mx-4"/>
            Anyone and everyone can pay without help.
        </div>
      </div>
    </div>
    <div class="w-5/6 mx-auto flex flex-wrap mb-16">
      <div class="w-full lg:w-2/5 bg-white rounded-lg p-4 text-2xl">
        <div class="text-center text-5xl font-bold mb-8">Fast. Easy. Accessible.</div>
        <span class="font-bold">Smyle</span> was designed to be used by anyone, no matter their current condition or health.
        <p class="mt-6">
          Special consideration was given to ensure <span class="font-bold">Smyle</span> could be used by individuals with Alzheimers, Dementia and even those who are paralyzed neck down.
        </p>
        <p class="mt-6">
          Our payment system can be used without ever using your hands, opening up individual payment for thousands of individuals.
        </p>
      </div>
      <img src="../assets/late.svg" alt="Late" class="w-full lg:w-3/5"/>
    </div>
    <div class="w-5/6 mx-auto flex flex-wrap mb-16">
      <img src="../assets/rocket.svg" alt="Fast" class="w-full lg:w-3/5"/>
      <div class="w-full lg:w-2/5 bg-white rounded-lg p-4 text-2xl">
        <div class="text-center text-5xl font-bold mb-8">Skyrocket your business.</div>
        Help your business grow with Smyle's builtin monitoring tools.
        <p class="mt-6">
          Paying is as simple as looking, ordering and smiling. Our software walks you through it. Experience some of the quickest and easiest payments of your life.
        </p>
        <p class="mt-6">
          Business analytics allows you to know your customer before you ever talk to them. Recommend and fine tune your experience to each individual.
        </p>
      </div>
    </div>
    <div class="text-center pb-16">
      <div class="text-6xl font-bold">Interested in joining us?</div>
      <button class="bg-blue-600 text-3xl text-white px-4 py-2 rounded-lg">Register Now</button>
      <router-link tag="a" to="/login" class="text-blue-500 text-2xl hover:underline ml-4">or Log In</router-link>
    </div>
  </div>
</template>

<style>
.rounder {
  border-radius: 1rem;
}

.heading-picture {
  background-image: url(../assets/leadpic.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 32rem;
}
</style>

<script>
import nav from '../scripts/nav'

export default {
  name: 'Landing',

  mounted() {
    nav.commit('setSettings', false)
    nav.commit('setCashier', false)
  }
}
</script>