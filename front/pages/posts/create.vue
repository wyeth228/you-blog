<template>
  <main class="p-4">
    <div class="container mx-auto">
      <h1 class="text-xl">Написать пост</h1>

      <editor class="shadow mt-4 p-4" :config="editorConfig" />
    </div>
  </main>
</template>

<script>
  export default {
    name: "create",

    data: () => ({
      editorConfig: {
        placeholder: "Напишите что нибудь...",
      },
    }),

    mounted() {},
  };
</script>
