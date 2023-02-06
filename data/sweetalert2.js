export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary'
    },
    buttonsStyling: false,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: '關閉',
    timer: 3000,
    timerProgressBar: true
});

export const swalToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: 'bottom-end',
    timer: 3000,
    timerProgressBar: true
});