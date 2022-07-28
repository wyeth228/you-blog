<template>
  <header class="header h-20 mb-4 p-2 shadow flex items-center">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-3xl font-bold">
          <nuxt-link to="/">
            YOU<span class="text-green-300">BLOG</span>
          </nuxt-link>
        </h1>
      </div>

      <div class="flex items-center uppercase">
        <nuxt-link class="flex items-center" to="/profile">
          <div class="w-8 h-8 bg-gray-600 rounded-sm"></div>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
