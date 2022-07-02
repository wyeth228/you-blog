<template>
  <main class="w-full max-w-lg">
    <div class="flex flex-col mt-6 border-t-4 border-green-300 shadow-md p-12">
      <auth-logo class="mb-14" />

      <auth-with-socials class="mb-6" />

      <auth-or-section class="mb-6" />

      <form>
        <div class="mb-4 text-gray-400">Введите ваши данные, чтобы войти</div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2 border-red-300"
            v-model="email"
            :input-type="'email'"
            :placeholder="'E-mail'"
          />
          <p class="hidden text-red-500 text-xs italic">Введите e-mail</p>
        </div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2 border-red-300"
            v-model="password"
            :input-type="'password'"
            :placeholder="'Пароль'"
          />
          <p class="hidden text-red-500 text-xs italic">Введите пароль</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click.prevent="signIn"
            class="bg-blue-400 hover:bg-blue-500 disabled:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </div>

    <section class="w-full max-w-screen-sm shadow-md p-6 text-center mt-2">
      <span>Нет аккаунта?</span>
      <nuxt-link
        class="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500"
        to="/auth/signup"
      >
        Зарегистрируйтесь
      </nuxt-link>
    </section>
  </main>
</template>

<script lang="ts">
import AuthFetchClient from "../../api/AuthFetchClient";
import Config from "../../helpers/Config";
import UserLocalStorageRepository from "../../repositories/UserLocalStorageRepository";

const authFetchClient = new AuthFetchClient(
  Config.API_URL,
  Config.API_SIGNUP_PATH,
  Config.API_SIGNIN_PATH,
  Config.API_VK_AUTH_PATH,
  Config.API_GOOGLE_AUTH_PATH
);

export default {
  layout: "auth",

  data: () => ({
    email: "",
    password: "",

    buttonDisabled: false,
  }),

  methods: {
    async signIn(e): Promise<void> {
      this.buttonDisabled = true;

      const { statusCode, data } = await authFetchClient.signIn({
        email: this.email,
        password: this.password,
      });

      if (statusCode === 204) {
        this.$store.commit("user/setAuth", true);
        UserLocalStorageRepository.setAuth(1);
        this.$router.push("/");

        return;
      }

      if (data.message) {
        this.$store.commit("infoPopup/setMessage", data.message);
        this.$store.commit("infoPopup/show");
      }

      this.buttonDisabled = false;
    },
  },
};
</script>
