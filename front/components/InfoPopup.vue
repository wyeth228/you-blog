<template>
  <div
    @click.self="close"
    class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-25 flex justify-center items-center"
    :class="{ hidden: !isVisible }"
  >
    <div class="max-w-md w-full max-h-96 bg-white m-8 p-8 rounded-xl">
      <h1 class="text-2xl">Сообщение</h1>
      <div class="bg-gray-100 text-gray-600 rounded-lg mt-6 p-2 text-center">
        {{ message }}
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click.prevent="close"
          class="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ок
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
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
};
</script>
