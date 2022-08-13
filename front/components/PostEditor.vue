<template>
  <div class="post-editor border-2 border-black p-4">
    <post-block
      v-for="(block, idx) of post.blocks"
      :block-type="block.type"
      :block-text="block.text"
      :editable="postMode === 'edit'"
      :idx="idx"
      :key="idx"
      @delete-block="deleteBlock"
    />
    <post-block-creator @create-new-block="createNewBlock" />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      postMode: {
        type: String,
        default: "read", // "read" | "edit"
      },
    },

    data: () => ({
      post: {
        blocks: [
          {
            type: "header",
            text: "Напишите что-нибудь...",
          },
          {
            type: "paragraph",
            text: "fajfajwifjawfjaopwf dawoidjaiwjdioaw djaiwdjiawjdiawjdjawjda dad",
          },
        ],
      },
    }),

    methods: {
      createNewBlock(blockType: string): void {
        this.post.blocks.push({
          type: blockType,
          text: "...",
        });
      },
      deleteBlock(idx: number): void {
        console.log(idx);

        this.post.blocks.splice(idx, 1);
      },
    },
  });
</script>
