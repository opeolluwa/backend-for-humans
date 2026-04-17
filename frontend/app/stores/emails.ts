import api from "~/plugin/api";
import type { Email } from "../../../bindings/Email";

const useEmailStore = defineStore("emails", {
  state: () => ({
    emails: [] as Array<Email>,
  }),

  actions: {
    async fetchEmails() {
      try {
        const res = await api.get("/emails");
        this.emails = res.data?.data || [];
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    },

    async markAsRead(identifier: string) {
      try {
        await api.patch(`/emails/${identifier}`, { isRead: true });
        const email = this.emails.find((e) => e.identifier === identifier);
        if (email) email.isRead = true;
      } catch (error) {
        console.error("Failed to mark email as read:", error);
      }
    },

    async toggleStarred(identifier: string, isStarred: boolean) {
      try {
        await api.patch(`/emails/${identifier}`, { isStarred });
        const email = this.emails.find((e) => e.identifier === identifier);
        if (email) email.isStarred = isStarred;
      } catch (error) {
        console.error("Failed to update starred status:", error);
      }
    },
  },

  persist: true,
});

export { useEmailStore };
