import { useState } from "react";
import { createdBudget } from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal } from "../../model/uiSlice";
import { createBatch } from "../../utils/batch";
import uid from "../../utils/id";
import Button from "../common/button";
import Input from "../common/input";
import { ModalWrapper } from "./base";

// interface Props {}

const CreateBudget = () => {
	const dispatch = useAppDispatch();
	const show = useAppSelector(selectModal(ModalE.BUDGET));
	const [name, setName] = useState("");

	if (!show) return null;

	const handleCreate = () => {
		const batch = createBatch("batch 1", {
			start: new Date(),
			end: new Date()
		});

		const budget: Budget = {
			id: uid(),
			name,
			batches: [batch],
			batchList: [{ id: batch.id, name: batch.name }]
		};

		dispatch(createdBudget(budget));
	};

	return (
		<ModalWrapper theme={window.theme} title="create new batch">
			<Input
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="budget name"
			/>

			<div>
				<Button color={window.theme.primary} onClick={handleCreate}>
					create
				</Button>
				<Button color={window.theme.secondary} onClick={undefined}>
					Cancel
				</Button>
			</div>
		</ModalWrapper>
	);
};

export default CreateBudget;
