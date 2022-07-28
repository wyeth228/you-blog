<template>
  <div
    @click.self="close"
    class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-25 flex justify-center items-center"
    :class="{ hidden: !isVisible }"
  >
    <div
      class="max-w-md w-full max-h-96 bg-white m-8 p-8 rounded-md border-4 border-black"
    >
      <h1 class="text-2xl">Сообщение</h1>
      <div
        class="bg-gray-100 text-gray-500 rounded-md mt-6 p-2 text-center border-2 border-black"
      >
        {{ message }}
      </div>
      <div class="flex justify-end mt-6">
        <default-button @click="close"> Ок </default-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    methods: {
      close(): void {
        this.$store.commit("infoPopup/close");
      },
    },

    computed: {
      isVisible(): boolean {
        return this.$store.getters["infoPopup/isVisible"];
      },
      message(): string {
        return this.$store.getters["infoPopup/message"];
      },
    },
  });
</script>
