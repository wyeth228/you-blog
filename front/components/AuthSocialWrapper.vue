<template>
  <button
    class="hover:bg-blue-500 w-10 h-10 ml-3 flex justify-center items-center cursor-pointer rounded-full bg-green-300 text-white fill-current"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    type: String,
  },
};
</script>
