<template>
  <main class="w-full max-w-screen-sm">
    <!-- Форма регистрации  -->
    <form class="flex flex-col mt-6 border-t-4 border-green-300 shadow-md p-6">
      <h1 class="text-4xl mb-5">Зарегистрироваться</h1>

      <div class="mb-3">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          E-mail
        </label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="box@email.su"
        />
        <p class="hidden text-red-500 text-xs italic">Введите e-mail</p>
      </div>
      <div class="mb-3">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Никнейм
        </label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Ник228"
        />
        <p class="hidden text-red-500 text-xs italic">Введите никнейм</p>
      </div>
      <div class="mb-3">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Пароль
        </label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
        />
        <p class="hidden text-red-500 text-xs italic">Введите пароль</p>
      </div>
      <div class="mb-5">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Введите пароль еще раз
        </label>
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
        />
        <p class="hidden text-red-500 text-xs italic">Введите пароль</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Регистрация
        </button>
      </div>
    </form>

    <!-- Уже есть аккаунт? -->
    <article class="w-full max-w-screen-sm shadow-md p-6 text-center mt-2">
      <span>Уже есть аккаунт?</span>
      <nuxt-link
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        to="/auth/signin"
      >
        Войдите
      </nuxt-link>
    </article>
  </main>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "auth",
});
</script>
