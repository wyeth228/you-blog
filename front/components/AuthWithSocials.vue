<template>
  <div class="flex items-center">
    <span class="opacity-60">Войти с помощью</span>

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
import VkSvg from "@/assets/img/socials/vk.svg";
import GoogleSvg from "@/assets/img/socials/google.svg";

import Config from "../helpers/Config";
import AuthFetchClient from "../api/AuthFetchClient";
import UserLocalStorageRepository from "../repositories/UserLocalStorageRepository";

const authFetchClient = new AuthFetchClient(
  Config.API_URL,
  Config.API_SIGNUP_PATH,
  Config.API_VK_AUTH_PATH
);

export default {
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

  async created(): Promise<void> {
    const { code } = this.$route.query;

    if (code) {
      this.vkAuth(code);
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
        const vkRedirectUrl = Config.APP_URL + Config.APP_VK_REDIRECT_PATH;

        const statusCode = await authFetchClient.authWithVK(
          vkRedirectUrl,
          vkCode
        );

        if (statusCode === 404) {
          return this.$router.push({ path: "/auth/signup?type=vk" });
        }

        if (statusCode === 204) {
          this.$store.commit("user/setAuth", true);

          UserLocalStorageRepository.setAuth(1);

          this.$router.push("/");
        }
      } catch (e: any) {
        console.warn(e);
      }
    },
    async googleAuth(): Promise<void> {},
  },
};
</script>
