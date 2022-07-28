<template>
  <main class="p-4">
    <div class="container mx-auto">
      <h1 class="text-xl">Профиль</h1>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "profile",

    middleware: ["checkAuth"],
  });
</script>
