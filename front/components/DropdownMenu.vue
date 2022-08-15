<template>
  <div
    v-if="active"
    class="absolute top-0 left-0 w-full bg-gray-200 border-2 border-black"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      active: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>
