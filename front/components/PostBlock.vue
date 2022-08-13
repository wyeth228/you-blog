<template>
  <div class="post-block relative">
    <post-block-delete-button
      v-show="removeButtonIsActive"
      @click.native="deleteBlock"
    />
    <component
      :is="'post-' + blockType"
      :contenteditable="editable"
      @input.native="input"
      @focus.native="focusHandler"
      @blur.native="focusHandler"
      class="w-full outline-none focus:bg-gray-100"
    >
      {{ blockText }}
    </component>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      blockType: {
        type: String,
        default: "header",
      },
      blockText: {
        type: String,
        default: "",
      },
      editable: {
        type: Boolean,
        default: false,
      },
      idx: {
        type: Number,
        required: true,
      },
    },

    data: () => ({
      removeButtonIsActive: false,
    }),

    methods: {
      onInput(e: Event): void {
        (e.target as HTMLElement).innerHTML.trim();
      },
      focusHandler(): void {
        const TIME_TO_HIDE_BTN = 150;

        setTimeout(() => {
          this.removeButtonIsActive = !this.removeButtonIsActive;
        }, TIME_TO_HIDE_BTN);
      },
      deleteBlock(): void {
        this.$emit("delete-block", this.idx);
      },
    },
  });
</script>
