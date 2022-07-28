<template>
  <main class="w-full max-w-lg">
    <div class="flex flex-col mt-6 p-12 border-4 border-black">
      <auth-logo class="mb-14" />

      <auth-with-socials class="mb-6" />

      <auth-or-section class="mb-6" />

      <form>
        <div class="mb-4 text-gray-400">Введите ваши данные, чтобы войти</div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2"
            v-model="email"
            :input-type="'email'"
            :placeholder="'E-mail'"
          />
          <p class="hidden text-red-500 text-xs italic">Введите e-mail</p>
        </div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2"
            v-model="password"
            :input-type="'password'"
            :placeholder="'Пароль'"
          />
          <p class="hidden text-red-500 text-xs italic">Введите пароль</p>
        </div>
        <div class="flex items-center justify-between">
          <default-button @click="signIn">Войти</default-button>
          <default-href href="'#'" text="Забыли пароль?" />
        </div>
      </form>
    </div>

    <section
      class="w-full max-w-screen-sm mt-2 p-6 text-center border-4 border-black"
    >
      <span>Нет аккаунта?</span>
      <default-href href="/auth/signup" text="Зарегистрируйтесь" />
    </section>
  </main>
</template>

<script lang="ts">
  import Vue from "vue";

  import AuthFetchClient from "../../api/AuthFetchClient";
  import FetchClient from "../../api/FetchClient";
  import Config from "../../helpers/Config";

  const authFetchClient = new AuthFetchClient(
    new FetchClient({ "Content-Type": "application/json" }),
    Config.API_URL,
    Config.API_SIGNUP_PATH,
    Config.API_SIGNIN_PATH,
    Config.API_VK_AUTH_PATH,
    Config.API_GOOGLE_AUTH_PATH
  );

  export default Vue.extend({
    layout: "auth",

    data: () => ({
      email: "",
      password: "",

      buttonDisabled: false,
    }),

    methods: {
      async signIn(e: Event): Promise<void> {
        e.preventDefault();

        this.buttonDisabled = true;

        const { statusCode, data } = await authFetchClient.signIn({
          email: this.email,
          password: this.password,
        });

        if (statusCode === 204) {
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
  });
</script>
