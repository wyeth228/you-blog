<template>
  <div class="post-block relative">
    <post-block-delete-button
      v-show="removeButtonIsActive"
      @click.native="deleteBlock"
    />
    <component
      :is="'post-' + blockType"
      :contenteditable="editable"
      @input.native="onInput"
      @focus.native="focusHandler"
      @blur.native="focusHandler"
      @keydown.enter.native.prevent
      class="w-full outline-none focus:bg-gray-100"
    >
      {{ text }}
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
      text: "",
    }),

    mounted(): void {
      this.text = this.blockText;
    },

    methods: {
      onInput(e: Event): void {
        this.$emit(
          "text-changed",
          (e.target as HTMLElement).innerHTML.trim(),
          this.idx
        );
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
