<template>
  <main>
    <div class="container mx-auto p-4 border-4 border-black">
      <div class="max-w-3xl mx-auto">
        <post-editor :post-mode="'edit'" />

        <div class="flex justify-end">
          <default-button class="w-full max-w-xs mt-4">
            Публикация
          </default-button>
        </div>
      </div>
    </div>
  </main>
</template>
