<script>
import { RouterView } from "vue-router";
import NavbarComponent from "../components/NavbarComponent.vue";

export default {
    data() {
        return {};
    },
    components: {
        RouterView,
        NavbarComponent
    }
};
</script>

<template>
    <NavbarComponent layout="front" />
    <RouterView />
</template>

<style lang="scss"></style>
