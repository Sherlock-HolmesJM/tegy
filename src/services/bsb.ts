import { User } from "@firebase/auth";
import { initialState } from "../model/budgetSlice";
import { strip } from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getPathSegments, getWriter, get, getList } from "./httpService";
import log from "./logger";

export const updateHeads = async (heads: Heads, cb: Callback) => {
	try {
		const writer = getWriter();
		writer.update({ heads }, [getCurrentUser().uid]);
		await writer.commit();
	} catch (error) {
		log(error);
		cb.error();
	}
};
