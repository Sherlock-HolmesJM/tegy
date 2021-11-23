import Swal from "sweetalert2";
const swalDelete = (cb: () => void) => {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: window.theme.primary,
		cancelButtonColor: window.theme.secondary,
		confirmButtonText: "Yes, delete it!"
	}).then(result => {
		if (result.isConfirmed) cb();
	});
};

export { swalDelete };
