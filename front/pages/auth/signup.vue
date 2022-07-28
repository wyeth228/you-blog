<template>
  <main class="w-full max-w-lg">
    <div class="flex flex-col mt-6 p-12 border-4 border-black">
      <auth-logo class="mb-14" />

      <auth-with-socials class="mb-6" />

      <auth-or-section class="mb-6" />

      <form>
        <div class="mb-4 text-gray-400">
          Введите ваши данные, чтобы зарегистрироваться
        </div>
        <div class="mb-4">
          <auth-default-input
            class="mb-2"
            :class="{ 'border-red-400': emailError }"
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
            class="mb-2"
            :class="{ 'border-red-400': usernameError }"
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
            class="mb-2"
            :class="{ 'border-red-400': passwordError }"
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
            class="mb-2"
            :class="{ 'border-red-400': password2Error }"
            v-model="password2"
            :input-type="'password'"
            :placeholder="'Введите пароль еще раз'"
          />
          <p class="text-red-400 text-xs italic">
            {{ password2Error }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <default-button
            @click="signUp"
            :disabled="buttonDisabled"
            class="w-full"
          >
            Регистрация
          </default-button>
        </div>
      </form>
    </div>

    <section
      class="w-full max-w-screen-sm mt-2 p-6 text-center border-4 border-black"
    >
      <span>Уже есть аккаунт?</span>
      <default-href href="/auth/signin" text="Войдите" />
    </section>
  </main>
</template>

<script lang="ts">
  import Vue from "vue";

  import ValidUserCredentials from "../../helpers/ValidUserCredentials";
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
      inputErrors: [] as Array<{ inputName: string; text: string }>,

      email: "",
      username: "",
      password: "",
      password2: "",

      buttonDisabled: false,
    }),

    methods: {
      deleteErrorsOfInput(inputName: string): void {
        this.inputErrors = this.inputErrors.filter(
          (inputError) => inputError.inputName !== inputName
        );
      },
      findInputError(inputName: string): string {
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
      async signUp(e: Event): Promise<void> {
        e.preventDefault();

        this.buttonDisabled = true;

        if (!this.allFieldsValid()) {
          this.buttonDisabled = false;

          return;
        }

        const { statusCode, data } = await authFetchClient.signUp(
          {
            email: this.email,
            username: this.username,
            password: this.password,
          },
          this.$route.query.type as any
        );

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

    computed: {
      emailError(): string {
        return this.findInputError("email");
      },
      usernameError(): string {
        return this.findInputError("username");
      },
      passwordError(): string {
        return this.findInputError("password");
      },
      password2Error(): string {
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
  });
</script>
