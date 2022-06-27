<template>
  <main class="w-full max-w-lg">
    <div class="flex flex-col mt-6 border-t-4 border-green-300 shadow-md p-12">
      <auth-logo class="mb-14" />

      <auth-with-socials class="mb-6" />

      <auth-or-section class="mb-6" />

      <form>
        <div class="mb-4 opacity-40">
          Введите ваши данные, чтобы зарегистрироваться
        </div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2 border-red-300"
            :class="{ 'border-2': emailError }"
            v-model="email"
            :input-type="'email'"
            :placeholder="'E-mail'"
          />
          <p class="text-red-400 text-xs italic">
            {{ emailError }}
          </p>
        </div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2 border-red-300"
            :class="{ 'border-2': usernameError }"
            v-model="username"
            :input-type="'text'"
            :placeholder="'Никнейм'"
          />
          <p class="text-red-400 text-xs italic">
            {{ usernameError }}
          </p>
        </div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2 border-red-300"
            :class="{ 'border-2': passwordError }"
            v-model="password"
            :input-type="'password'"
            :placeholder="'Пароль'"
          />
          <p class="text-red-400 text-xs italic">
            {{ passwordError }}
          </p>
        </div>
        <div class="mb-6">
          <auth-default-input
            class="mb-2 border-red-300"
            :class="{ 'border-2': password2Error }"
            v-model="password2"
            :input-type="'password'"
            :placeholder="'Введите пароль еще раз'"
          />
          <p class="text-red-400 text-xs italic">
            {{ password2Error }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click.prevent="signUp"
            class="w-full bg-blue-400 hover:bg-blue-500 disabled:bg-blue-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>

    <section class="w-full max-w-screen-sm shadow-md p-6 text-center mt-2">
      <span>Уже есть аккаунт?</span>
      <nuxt-link
        class="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500"
        to="/auth/signin"
      >
        Войдите
      </nuxt-link>
    </section>
  </main>
</template>

<script lang="ts">
import ValidUserCredentials from "../../helpers/ValidUserCredentials";
import AuthFetchClient from "../../api/AuthFetchClient";
import Config from "../../helpers/Config";

const authFetchClient = new AuthFetchClient(
  Config.API_URL,
  Config.API_SIGNUP_PATH,
  Config.API_VK_AUTH_PATH
);

export default {
  layout: "auth",

  data: () => ({
    inputErrors: [] as Array<{ inputName: string; text: string }>,

    email: "",
    username: "",
    password: "",
    password2: "",
  }),

  methods: {
    deleteErrorsOfInput(inputName): void {
      this.inputErrors = this.inputErrors.filter(
        (inputError) => inputError.inputName !== inputName
      );
    },
    findInputError(inputName): string {
      const inputError = this.inputErrors.find(
        (error) => error.inputName === inputName
      );

      return inputError ? inputError.text : "";
    },
    allFieldsValid(): boolean {
      if (!ValidUserCredentials.email(this.email)) {
        this.inputErrors.push({
          inputName: "email",
          text: "Некорректный e-mail",
        });
      }

      if (!ValidUserCredentials.username(this.username)) {
        this.inputErrors.push({
          inputName: "username",
          text: "Некорректный никнейм",
        });
      }

      if (!ValidUserCredentials.password(this.password)) {
        this.inputErrors.push({
          inputName: "password",
          text: "Некорректный пароль",
        });
      }

      if (this.password !== this.password2) {
        this.inputErrors.push({
          inputName: "password2",
          text: "Пароли не совпадают",
        });
      }

      if (this.inputErrors.length > 0) return false;

      return true;
    },
    async signUp(e) {
      if (!this.allFieldsValid()) {
        return;
      }

      const statusCode = await authFetchClient.signUp(
        { email: this.email, username: this.username, password: this.password },
        this.$route.query.type
      );
    },
  },

  computed: {
    emailError() {
      return this.findInputError("email");
    },
    usernameError() {
      return this.findInputError("username");
    },
    passwordError() {
      return this.findInputError("password");
    },
    password2Error() {
      return this.findInputError("password2");
    },
  },

  watch: {
    email() {
      this.deleteErrorsOfInput("email");
    },
    username() {
      this.deleteErrorsOfInput("username");
    },
    password() {
      this.deleteErrorsOfInput("password");
    },
    password2() {
      this.deleteErrorsOfInput("password2");
    },
  },
};
</script>
