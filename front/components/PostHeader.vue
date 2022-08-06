<template>
  <h1
    class="font-bold text-xl p-2 outline-none focus:bg-blue-100"
    :contenteditable="editable"
  >
    <slot></slot>
  </h1>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      editable: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>
