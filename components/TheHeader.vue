<template>
  <header class="header p-2 border-b-2 border-gray-500 border-opacity-20">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Header logo -->
      <div class="flex-1 flex items-center">
        <nuxt-link to="/">
          <h1 class="text-3xl font-bold">
            YOU<span class="text-green-300">BLOG</span>
          </h1>
        </nuxt-link>
      </div>

      <!-- Header hrefs -->
      <div class=" flex-1 flex items-center justify-center uppercase font-bold">
        <nuxt-link
          class="flex items-center mr-8 hover:text-green-300 transition"
          to="/"
        >
          Новости
        </nuxt-link>
        |
        <nuxt-link
          class="flex items-center ml-8 mr-8 hover:text-green-300 transition"
          to="/profile"
        >
          Профиль
        </nuxt-link>
        |
        <nuxt-link
          class="flex items-center ml-8 hover:text-green-300 transition"
          to="/profile"
        >
          Мы
        </nuxt-link>
      </div>

      <!-- Header search -->
      <div class="flex-1 flex items-center justify-end">
        <button class="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
