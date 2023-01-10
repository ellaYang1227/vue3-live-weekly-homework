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