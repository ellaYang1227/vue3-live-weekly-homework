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
    <div class="py-5 fixed-top-margin-top">
        <RouterView />
    </div>
</template>

<style lang="scss"></style>
