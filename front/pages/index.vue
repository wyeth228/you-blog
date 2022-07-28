<template>
  <main class="p-4">
    <div class="container mx-auto"></div>
  </main>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "home",

    middleware: ["checkAuth"],
  });
</script>
