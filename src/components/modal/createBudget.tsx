import { useState } from "react";
import { toast } from "react-toastify";
import { budgetCreated, stateLoaded } from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import { getCurrentUser } from "../../services/authService";
import { setBudget } from "../../services/stateService";
import { createBatch } from "../../utils/batch";
import uid from "../../utils/id";
import Button from "../common/button";
import Input from "../common/input";
import { Modal, CancelButton } from "./base";

const CreateBudgetButton = () => {
	const dispatch = useAppDispatch();

	return (
		<div onClick={() => dispatch(toggledModal(ModalE.BUDGET))}>New Budget</div>
	);
};

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
			batchList: [{ id: batch.id, name: batch.name }],
			head: batch.id
		};

		dispatch((dispatch, getState) => {
			const oldSate = getState().budgets;

			dispatch(budgetCreated(budget));
			dispatch(toggledModal(ModalE.BUDGET));

			setBudget(getCurrentUser(), {
				error: () => dispatch(stateLoaded(oldSate))
			});
		});
	};

	return (
		<Modal theme={window.theme} title="create new batch">
			<Input
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="budget name"
			/>

			<div>
				<Button color={window.theme.primary} onClick={handleCreate}>
					create
				</Button>
				<CancelButton modal={ModalE.BUDGET} />
			</div>
		</Modal>
	);
};

export { CreateBudgetButton };

export default CreateBudget;
