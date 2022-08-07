<template>
  <component :is="'post-' + blockType" :contenteditable="editable">
    <post-block-delete-button :is-active="removeButtonIsActive" />
    {{ blockText }}
  </component>
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
    },

    data: () => ({
      removeButtonIsActive: false,
    }),

    mounted(): void {
      this.$el.addEventListener("focus", this.focusHandler);
      this.$el.addEventListener("blur", this.focusHandler);
    },

    methods: {
      focusHandler(): void {
        this.removeButtonIsActive = !this.removeButtonIsActive;
      },
    },

    beforeDestroy(): void {
      this.$el.removeEventListener("focus", this.focusHandler);
      this.$el.removeEventListener("blur", this.focusHandler);
    },
  });
</script>
