<script>
import { RouterView } from "vue-router";
import { LoadingStore } from "./stores/LoadingStore.js";
import { mapState, mapActions } from "pinia";

export default {
    data() {
        return {};
    },
    components: {
        RouterView
    },
    mounted() {
        this.showLoading();
    },
    computed: {
        ...mapState(LoadingStore, ["isLoading"])
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading"])
    }
};
</script>

<template>
    <LoadingComponent v-model:active="isLoading" />
    <RouterView />
</template>

<style lang="scss"></style>
