import Swal from "sweetalert2/dist/sweetalert2.js";

const swalPopupOptions = {
    customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-secondary"
    },
    buttonsStyling: false,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "關閉",
    timer: 3000,
    timerProgressBar: true
};

const swalToastOptions = {
    toast: true,
    showConfirmButton: false,
    position: "bottom-end",
    timer: 3000,
    timerProgressBar: true
};

function showSwal(swalStype, icon, title, text) {
    const addOptions = { icon, title, text };
    if (swalStype === "popup") {
        return Swal.fire({ ...swalPopupOptions, ...addOptions });
    } else if (swalStype === "toast") {
        return Swal.fire({ ...swalToastOptions, ...addOptions });
    }
}

export { swalPopupOptions, swalToastOptions, showSwal };
