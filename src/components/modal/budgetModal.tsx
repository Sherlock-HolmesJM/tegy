import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	budgetCreated,
	budgetModified,
	budgetRemoved,
	selectBudget,
	selectBudgetList,
	stateLoaded
} from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import { getCurrentUser } from "../../services/authService";
import budgetService from "../../services/budgetService";
import { createBatch } from "../../utils/batch";
import uid from "../../utils/id";
import Button from "../common/button";
import Input from "../common/input";
import { Modal, CancelButton } from "./base";

const BudgetButton = ({ mode }: { mode: "create" | "modify" }) => {
	const dispatch = useAppDispatch();

	const Modal = mode === "create" ? ModalE.BUDGET_C : ModalE.BUDGET_M;
	const text = (mode === "create" ? "New" : "Edit") + " Budget";

	return <div onClick={() => dispatch(toggledModal(Modal))}>{text}</div>;
};

const BudgetModal = () => {
	const dispatch = useAppDispatch();

	const { length: budgetCount } = useAppSelector(selectBudgetList);
	const isCreate = useAppSelector(selectModal(ModalE.BUDGET_C));
	const isModify = useAppSelector(selectModal(ModalE.BUDGET_M));
	const budget = useAppSelector(selectBudget);

	const [name, setName] = useState("");

	useEffect(() => {
		setName(isModify ? budget.name : "");

		// eslint-disable-next-line
	}, [isModify]);

	if (!isCreate && !isModify) return null;

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
			const { budgets } = getState();

			dispatch(budgetCreated(budget));
			dispatch(toggledModal(ModalE.BUDGET_C));

			budgetService.postBudget(getCurrentUser(), {
				error: () => dispatch(stateLoaded(budgets))
			});
		});
	};

	const handleUpdate = () => {
		if (name) {
			dispatch((dispatch, getState) => {
				const { budgets } = getState();

				const newBudget = { ...budget, name };

				dispatch(budgetModified(newBudget));

				budgetService.patchBudget(newBudget, {
					error: () => dispatch(stateLoaded(budgets))
				});
			});
		}
	};

	const handleDelete = () => {
		dispatch((dispatch, getState) => {
			const { budgets } = getState();

			dispatch(budgetRemoved(budget));

			budgetService.removeBudget(budget, {
				error: () => dispatch(stateLoaded(budgets))
			});
		});
	};

	return (
		<Modal
			theme={window.theme}
			title={`${isCreate ? "create new" : "modify"} batch`}>
			<Input
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="budget name"
			/>

			<div>
				{isCreate && (
					<Button color={window.theme.primary} onClick={handleCreate}>
						create
					</Button>
				)}

				{isModify && (
					<Button color={window.theme.primary} onClick={handleUpdate}>
						update
					</Button>
				)}

				{budgetCount > 1 && (
					<Button color={window.theme.primary} onClick={handleDelete}>
						delete
					</Button>
				)}

				<CancelButton modal={ModalE.BUDGET_C} />
			</div>
		</Modal>
	);
};

export { BudgetButton };

export default BudgetModal;
