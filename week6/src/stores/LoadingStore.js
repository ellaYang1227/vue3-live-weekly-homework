import { defineStore } from "pinia";

export const LoadingStore = defineStore("LoadingStore", {
    state: () => ({
        isLoading: true
    }),
    actions: {
        showLoading() {
            this.isLoading = true;
        },
        hideLoading() {
            this.isLoading = false;
        }
    }
});
