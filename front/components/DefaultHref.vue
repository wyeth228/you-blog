<template>
  <nuxt-link
    class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-900 underline"
    :to="href"
  >
    {{ text }}
  </nuxt-link>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      href: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
  });
</script>
