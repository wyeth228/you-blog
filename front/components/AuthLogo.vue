<template>
  <div class="flex justify-center items-center">
    <LogoSvg class="w-2/12 mt-1 mr-4" />
    <h1 class="text-4xl text-center font-bold">YouBlog</h1>
  </div>
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
