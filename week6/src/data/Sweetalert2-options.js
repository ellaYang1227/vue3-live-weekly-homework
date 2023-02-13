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

function showSwal(swalStype, icon, title) {
    const addOptions = { icon, title };
    if (swalStype === "popup") {
        Swal.fire({ ...swalPopupOptions, ...addOptions });
    } else if (swalStype === "toast") {
        Swal.fire({ ...swalToastOptions, ...addOptions });
    }
}

export { swalPopupOptions, swalToastOptions, showSwal };
