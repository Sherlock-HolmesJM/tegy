import { useState } from "react";
import { toast } from "react-toastify";
import { createdBudget, stateLoaded } from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import { getCurrentUser } from "../../services/authService";
import { setDB } from "../../services/stateService";
import { createBatch } from "../../utils/batch";
import uid from "../../utils/id";
import Button from "../common/button";
import Input from "../common/input";
import { ModalWrapper, Cancel } from "./base";

const CreateBudget = () => {
	const dispatch = useAppDispatch();
	const show = useAppSelector(selectModal(ModalE.BUDGET));
	const [name, setName] = useState("");

	if (!show) return null;

	const handleCreate = () => {
		if (!name) return toast.error("Name cannot be blank");

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

		dispatch((dispatch, getState) => {
			const oldSate = getState().budgets;

			dispatch(createdBudget(budget));
			dispatch(toggledModal(ModalE.BUDGET));

			setDB(getCurrentUser(), {
				success: () => toast.success("Created successfully"),
				error: () => dispatch(stateLoaded(oldSate))
			});
		});
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
				<Cancel modal={ModalE.BUDGET} />
			</div>
		</ModalWrapper>
	);
};

export default CreateBudget;
