<template>
  <div class="p-2 bg-gray-100 flex justify-center relative">
    <dropdown-menu :active="selectionActive">
      <dropdown-menu-item
        v-for="(block, idx) in blockTypes"
        :key="idx"
        @click.native="selectBlock(block.type)"
      >
        {{ block.text }}
      </dropdown-menu-item>
    </dropdown-menu>

    <default-button @click.native="toggleSelection">
      <svg
        class="w-8"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 45.402 45.402"
        xml:space="preserve"
      >
        <path
          d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
        />
      </svg>
    </default-button>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    data: () => ({
      selectionActive: false,
      blockTypes: [
        {
          type: "header",
          text: "Заголовок",
        },
        {
          type: "paragraph",
          text: "Параграф",
        },
      ],
    }),

    methods: {
      toggleSelection(): void {
        this.selectionActive = !this.selectionActive;
      },
      selectBlock(blockType: string): void {
        this.$emit("create-new-block", blockType);

        this.toggleSelection();
      },
    },
  });
</script>
