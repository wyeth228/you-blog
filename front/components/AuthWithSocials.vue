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
import Vue from "vue";

import VkSvg from "@/assets/img/socials/vk.svg";
import GoogleSvg from "@/assets/img/socials/google.svg";

import Config from "../helpers/Config";
import AuthFetchClient from "../api/AuthFetchClient";

const authFetchClient = new AuthFetchClient(
  Config.API_URL,
  Config.API_VK_AUTH_PATH
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

  async created(): Promise<void> {
    const { redirect_url, code } = this.$route.query;

    if (!redirect_url || !code) {
      return;
    }

    try {
      const statusCode = await authFetchClient.authWithVK(
        redirect_url + "?redirect_url=" + redirect_url,
        code
      );

      if (statusCode === 404) {
        this.$router.push({ path: "/auth/signup?type=vk" });

        return;
      }

      if (statusCode === 201) {
        this.$store.commit("user/setAuth", true);
        this.$router.push("/");

        return;
      }
    } catch (e: any) {
      console.warn(e);
    }
  },

  methods: {
    handleSocialClick(e: Event, type: string): void {
      switch (type) {
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
          vkRedirectUrl + "?redirect_url=" + vkRedirectUrl,
          vkCode
        );
      } catch (e: any) {
        console.warn(e);
      }
    },
    async googleAuth(): Promise<void> {},
  },
});
</script>
