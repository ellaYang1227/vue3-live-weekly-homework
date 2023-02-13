<script>
import { LoadingStore } from "../../stores/LoadingStore.js";
import { mapActions } from "pinia";

export default {
    data() {
        return {};
    },
    components: {},
    mounted() {
        this.hideLoading();
    },
    methods: {
        ...mapActions(LoadingStore, ["showLoading", "hideLoading"])
    }
};
</script>

<template>產品</template>

<style lang="scss"></style>
