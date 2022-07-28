<template>
  <button
    class="hover:bg-green-300 w-10 h-10 ml-3 flex justify-center items-center cursor-pointer rounded-full text-black fill-current border-2 border-black"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      type: String,
    },
  });
</script>
