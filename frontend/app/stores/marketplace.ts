import api from "~/plugin/api";
import type { MarketPlace } from "../../../bindings/MarketPlace";

const useMarketplaceStore = defineStore("marketplace", {
  state: () => ({
    marketplaces: [] as Array<MarketPlace>,
  }),

  actions: {
    async fetchMarketplaces() {
      try {
        const res = await api.get("/marketplaces");
        this.marketplaces = res.data?.data || [];
      } catch (error) {
        console.error("Failed to fetch marketplaces:", error);
      }
    },
  },
  persist: true,
});

export { useMarketplaceStore };
