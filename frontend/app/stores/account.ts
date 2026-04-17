import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    firstName: "",
    lastName: "",
    email: "",
  }),
  persist: true,
});
