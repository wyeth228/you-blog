<template>
  <div class="border-2 border-black p-4">
    <template v-for="(block, idx) of post.blocks">
      <component
        :is="'post-' + block.type"
        :key="idx"
        :editable="postMode === 'edit'"
      >
        {{ block.text }}
      </component>
    </template>
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
  });
</script>
