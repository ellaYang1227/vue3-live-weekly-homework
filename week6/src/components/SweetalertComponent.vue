<script>
import { swalPopupOptions, swalToastOptions } from "../data/Sweetalert2-options.js";

export default {
    data() {
        return {};
    },
    methods: {
        showSwal(swalStype, icon, title, text) {
            const addOptions = { icon, title, text };
            if (swalStype === "popup") {
                return this.$swal({ ...swalPopupOptions, ...addOptions });
            } else if (swalStype === "toast") {
                return this.$swal({ ...swalToastOptions, ...addOptions });
            }
        }
    }
};
</script>

<template>
    <div></div>
</template>
