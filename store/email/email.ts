import { defineStore } from "pinia";
import { Email } from "~/shared/Email";

export const useEmailStore = defineStore({
  id: "email",

  state: () => ({
    emails: [] as Email[],
  }),

  getters: {
    getEmails(): Email[] {
      return this.emails;
    },
  },

  actions: {
    async fetchEmailsFromJSON() {
      try {
        const response = await fetch("/json/emails.json");
        if (!response.ok) {
          throw new Error("Failed to load emails from JSON file");
        }
        const emails = await response.json();
        this.setEmails(emails);
      } catch (error) {}
    },

    setEmails(emails: Email[]) {
      this.emails = emails;
    },
  },
});
