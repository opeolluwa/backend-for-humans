import { defineStore } from "pinia";
import api from "~/plugin/api";

import type { Country } from "../../../bindings/Country";

export const useCountryStore = defineStore("locale_store", {
  state: () => ({
    countries: [] as Country[],
  }),

  actions: {
    async fetchCountries() {
      try {
        const res = await api.get("/countries");
        const data = res.data?.data || [];

        console.log("Fetched countries:", data);

        this.countries = data;

        return data;
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        return [];
      }
    },
  },

  persist: true,
});
