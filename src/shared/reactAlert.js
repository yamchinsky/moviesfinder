import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function alertError(message) {
	return toast.error(message, {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})
}
function alertSuccess(message) {
	return toast.success(message, {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})
}

export { alertError, alertSuccess }
