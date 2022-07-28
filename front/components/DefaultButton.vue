<template>
  <button
    @click.prevent="$emit('click', $event)"
    class="font-bold py-2 px-4 rounded border-2 border-black hover:bg-green-300"
  >
    <slot></slot>
  </button>
</template>
