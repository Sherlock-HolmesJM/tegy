import { useState } from "react";
import {
	headsUpdated,
	selectBatchList,
	selectHeads
} from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { updateHeads } from "../../services/stateService";
import Select from "./select";

function BatchSelect() {
	const dispatch = useAppDispatch();

	const heads = useAppSelector(selectHeads);
	const batchList = useAppSelector(selectBatchList);

	const [batchId, setBatch] = useState(heads.batch);

	const handleSelect = (id: string) => {
		setBatch(id);

		const old_heads = { ...heads };
		const newHeads = { ...old_heads, batch: id };

		dispatch(headsUpdated(newHeads));

		updateHeads(newHeads, {
			error: () => dispatch(headsUpdated(old_heads))
		});
	};

	return <Select value={batchId} options={batchList} onSelect={handleSelect} />;
}

export default BatchSelect;
