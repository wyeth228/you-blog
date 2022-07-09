<template>
  <main class="index">
    <div class="container mx-auto"></div>
  </main>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    middleware: ["checkAuth"],
  });
</script>
