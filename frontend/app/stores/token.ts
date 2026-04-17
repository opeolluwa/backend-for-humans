import { defineStore } from "pinia";
import api from "~/plugin/api";

export const useTokenStore = defineStore("token_store", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
    requestToken: "",
    accessTokenExpiry: 0,
    refreshTokenExpiry: 0,
  }),

  actions: {
    persistRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
    },

    persistAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },

    persistRequestToken(requestToken: string) {
      this.requestToken = requestToken;
    },

    clearTokens() {
      this.$reset();
    },

    setAccessTokenExpiry(expiry: number) {
      this.accessTokenExpiry = expiry;
    },

    setRefreshTokenExpiry(expiry: number) {
      this.refreshTokenExpiry = expiry;
    },

    extractAccessToken() {
      return this.accessToken;
    },

    async getRefreshToken() {
      const res = await api.get("/refresh-token", {
        headers: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });

      const data = res.data?.data;
      if (!data) return;

      if (data.accessToken) this.persistAccessToken(data.accessToken);
      if (data.exp) this.setAccessTokenExpiry(data.exp);
      if (data.refreshToken) this.persistRefreshToken(data.refreshToken);
      if (data.refreshTokenExp)
        this.setRefreshTokenExpiry(data.refreshTokenExp);
    },

    isAccessTokenValid() {
      const now = Math.floor(Date.now() / 1000);
      return this.accessToken && this.accessTokenExpiry > now + 60;
    },
  },

  getters: {},

  persist: true,
});
