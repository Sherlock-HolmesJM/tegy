import { toast } from "react-toastify";
import { store } from "../model/store";
import { setLoading } from "../model/uiSlice";

const log = {
	error: error => {
		const m = typeof error === "object" ? error.message : error;
		console.log(m);
		toast.error(m);
		store.dispatch(setLoading(0));
	},

	neutral: () => {
		store.dispatch(setLoading(0));
	}
};

export default log;
