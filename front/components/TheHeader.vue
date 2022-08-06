<template>
  <header class="header mb-4 flex items-center bg-gray-100">
    <div
      class="container mx-auto p-4 flex items-center justify-between border-4 border-black"
    >
      <div class="flex items-center">
        <h1 class="text-3xl font-bold">
          <nuxt-link class="flex" to="/">
            <LogoSvg class="w-14 mr-2" />
            YOU<span class="text-green-300">BLOG</span>
          </nuxt-link>
        </h1>
      </div>

      <div class="flex items-center uppercase">
        <nuxt-link class="flex items-center" to="/profile">
          <div class="p-4 bg-gray-300 rounded-sm border-2 border-black"></div>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from "vue";

  import LogoSvg from "@/assets/img/logo.svg";

  export default Vue.extend({
    components: {
      LogoSvg,
    },
  });
</script>
