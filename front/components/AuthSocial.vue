<template>
  <div class="flex items-center">
    <span class="opacity-60">Войти с помощью</span>
    <auth-social-wrapper v-for="(social, idx) of socials" :key="idx">
      <component :is="social.svgName"></component>
    </auth-social-wrapper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import VkSvg from "@/assets/img/socials/vk.svg";
import GoogleSvg from "@/assets/img/socials/google.svg";

export default Vue.extend({
  components: {
    VkSvg,
    GoogleSvg,
  },

  data: () => ({
    socials: [
      {
        path: "http://localhost:3000/auth/vk",
        svgName: "vkSvg",
      },
      {
        path: "http://localhost:3000/auth/google",
        svgName: "googleSvg",
      },
    ],
  }),
});
</script>
