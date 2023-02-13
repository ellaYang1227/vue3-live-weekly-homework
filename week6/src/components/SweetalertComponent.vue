<script>
import { swalPopupOptions, swalToastOptions } from "../data/Sweetalert2-options.js";

export default {
    data() {
        return {};
    },
    methods: {
        showSwal(swalStype, icon, title) {
            const addOptions = { icon, title };

            console.log();
            if (swalStype === "popup") {
                this.$swal({ ...swalPopupOptions, ...addOptions });
                // swalWithBootstrapButtons.fire({
                //     icon: "error",
                //     title: message
                // });
            } else if (swalStype === "toast") {
                console.log(this);
                this.$swal({ ...swalToastOptions, ...addOptions });
                // swalToast.fire({
                //     icon: "error",
                //     title: message
                // });
            }
        }
    }
};
</script>
