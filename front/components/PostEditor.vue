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
      @text-changed="textChanged"
    />
    <post-block-creator @create-new-block="createNewBlock" />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  import PostLocalStorageRepository from "../repositories/PostLocalStorageRepository";

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
        ],
      },
    }),

    mounted(): void {
      const post = PostLocalStorageRepository.getPost();

      if (post) {
        this.post = JSON.parse(post);
      }
    },

    methods: {
      createNewBlock(blockType: string): void {
        this.post.blocks.push({
          type: blockType,
          text: "...",
        });
      },
      deleteBlock(idx: number): void {
        this.post.blocks.splice(idx, 1);
      },
      textChanged(text: string, idx: number): void {
        this.post.blocks[idx].text = text;
      },
      savePost() {
        PostLocalStorageRepository.setPost(JSON.stringify(this.post));
      },
    },

    watch: {
      post: {
        deep: true,
        handler(): void {
          this.savePost();
        },
      },
    },
  });
</script>
