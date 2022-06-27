<template>
  <h1>Profile</h1>
</template>

<script lang="ts">
export default {
  mounted(): void {
    this.$router.push("/auth");
  },
};
</script>
