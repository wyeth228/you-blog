<template>
  <p class="p-2 outline-none focus:bg-blue-100" :contenteditable="editable">
    <slot></slot>
  </p>
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
