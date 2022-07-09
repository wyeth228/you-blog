<template>
  <h1>Profile</h1>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    mounted(): void {
      this.$router.push("/auth");
    },
  });
</script>
