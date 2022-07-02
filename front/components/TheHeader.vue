<template>
  <header class="header p-2 border-b-2 border-gray-500 border-opacity-20">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center">
        <nuxt-link to="/">
          <h1 class="text-3xl font-bold">
            YOU<span class="text-green-300">BLOG</span>
          </h1>
        </nuxt-link>
      </div>

      <div class="flex items-center justify-center uppercase font-bold">
        <nuxt-link
          class="flex items-center ml-8 mr-8 hover:text-green-300 transition"
          to="/profile"
        >
          Профиль
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
