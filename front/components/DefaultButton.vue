<template>
  <button
    @click.prevent="$emit('click', $event)"
    class="font-bold py-2 px-4 rounded border-2 border-black bg-green-300 hover:bg-blue-300"
  >
    <slot></slot>
  </button>
</template>
