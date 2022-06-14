<template>
  <main class="w-full max-w-lg">
    <!-- Форма входа  -->
    <form class="flex flex-col mt-6 border-t-4 border-green-300 shadow-md p-16">
      <auth-logo />

      <auth-social class="mb-6" />

      <auth-or-section class="mb-6" />

      <div class="mb-4 opacity-40">Введите ваши данные, чтобы войти</div>
      <div class="mb-4">
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="E-mail"
        />
        <p class="hidden text-red-500 text-xs italic">Введите e-mail</p>
      </div>
      <div class="mb-4">
        <input
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Пароль"
        />
        <p class="hidden text-red-500 text-xs italic">Введите пароль</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Войти
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500"
          href="#"
        >
          Забыли пароль?
        </a>
      </div>
    </form>

    <!-- Уже есть аккаунт? -->
    <article class="w-full max-w-screen-sm shadow-md p-6 text-center mt-2">
      <span>Нет аккаунта?</span>
      <nuxt-link
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-400"
        to="/auth/signup"
      >
        Зарегистрируйтесь
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
