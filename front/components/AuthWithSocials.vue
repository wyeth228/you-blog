<template>
  <div class="flex items-center">
    <span class="text-gray-400">Войти с помощью</span>

    <auth-social-wrapper
      v-for="(social, idx) of socials"
      :type="social.type"
      :key="idx"
      @click.native="handleSocialClick($event, social.type)"
    >
      <component :is="social.svgName"></component>
    </auth-social-wrapper>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  import VkSvg from "@/assets/img/socials/vk.svg";
  import GoogleSvg from "@/assets/img/socials/google.svg";

  import AuthFetchClient from "../api/AuthFetchClient";
  import FetchClient from "../api/FetchClient";
  import Config from "../helpers/Config";

  const authFetchClient = new AuthFetchClient(
    new FetchClient({ "Content-Type": "application/json" }),
    Config.API_URL,
    Config.API_SIGNUP_PATH,
    Config.API_SIGNIN_PATH,
    Config.API_VK_AUTH_PATH,
    Config.API_GOOGLE_AUTH_PATH
  );

  export default Vue.extend({
    components: {
      VkSvg,
      GoogleSvg,
    },

    data: () => ({
      socials: [
        {
          type: "vk",
          svgName: "vkSvg",
        },
        {
          type: "google",
          svgName: "googleSvg",
        },
      ],
    }),

    async beforeMount(): Promise<void> {
      const { type, code } = this.$route.query;

      if (!type) {
        return;
      }

      switch (type) {
        case "vk":
          this.vkAuth(code as string);
          break;
        case "google":
          this.googleAuth(code as string);
          break;
      }
    },

    methods: {
      handleSocialClick(e: Event, authType: string): void {
        switch (authType) {
          case "vk":
            this.vkAuth();
            break;
          case "google":
            this.googleAuth();
            break;
          default:
            return;
        }
      },
      async vkAuth(vkCode?: string): Promise<void> {
        try {
          const vkRedirectUrl =
            Config.APP_URL + Config.APP_VK_REDIRECT_PATH + "?type=vk";

          const statusCode = await authFetchClient.authWithVK(
            vkRedirectUrl,
            vkCode
          );

          if (statusCode === 404) {
            this.$router.push({ path: "/auth/signup?type=vk" });
            return;
          }

          if (statusCode === 204) {
            this.$router.push("/");
          }
        } catch (e: any) {
          console.warn(e);
        }
      },
      async googleAuth(googleCode?: string): Promise<void> {
        try {
          const googleRedirectUrl =
            Config.APP_URL + Config.APP_GOOGLE_REDIRECT_PATH + "?type=google";

          const statusCode = await authFetchClient.authWithGoogle(
            googleRedirectUrl,
            googleCode
          );

          if (statusCode === 404) {
            this.$router.push({ path: "/auth/signup?type=google" });

            return;
          }

          if (statusCode === 204) {
            this.$router.push("/");
          }
        } catch (e: any) {
          console.warn(e);
        }
      },
    },
  });
</script>
