<script>
import { swalPopupOptions, swalToastOptions } from "../data/Sweetalert2-options.js";

export default {
    data() {
        return {};
    },
    methods: {
        showSwal(swalStype, icon, title) {
            const addOptions = { icon, title };
            if (swalStype === "popup") {
                this.$swal({ ...swalPopupOptions, ...addOptions });
            } else if (swalStype === "toast") {
                console.log(this);
                this.$swal({ ...swalToastOptions, ...addOptions });
            }
        }
    }
};
</script>
