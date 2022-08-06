<template>
  <div
    class="w-full bg-blue-300 p-2 flex justify-center items-center mb-4 border-2 border-black font-bold"
  >
    Регистрация с помощью {{ social }}
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    data: () => ({
      socials: {
        vk: "ВКонтакте",
        google: "Google",
      } as { [key: string]: string },
    }),

    computed: {
      social(): string {
        return this.socials[this.$route.query.type as string];
      },
    },
  });
</script>
