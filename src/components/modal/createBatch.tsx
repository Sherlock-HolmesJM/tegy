import { useState, useEffect } from "react";
import {
	batchCreated,
	selectBatchList,
	stateLoaded
} from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import batchService from "../../services/batchService";
import { createBatch } from "../../utils/batch";
import Button from "../common/button";
import Input from "../common/input";
import { Modal, CancelButton } from "./base";

const BatchButton = ({ mode }: { mode: "create" | "modify" }) => {
	const dispatch = useAppDispatch();

	const BATCH = mode === "create" ? ModalE.BATCH_C : ModalE.BATCH_M;

	return (
		<div onClick={() => dispatch(toggledModal(BATCH))}>
			{mode === "create" ? "New Batch" : "Edit Batch"}
		</div>
	);
};

const CreateBatch = () => {
	const dispatch = useAppDispatch();

	const isCreate = useAppSelector(selectModal(ModalE.BATCH_C));
	const isUpdate = useAppSelector(selectModal(ModalE.BATCH_M));
	const { length: count } = useAppSelector(selectBatchList);

	const [date, setDate] = useState({
		start: new Date().toJSON().split("T")[0],
		end: new Date().toJSON().split("T")[0]
	});

	const [name, setName] = useState(`batch ${count + 1}`);

	useEffect(() => setName(`batch ${count + 1}`), [count]);

	if (!isCreate && !isUpdate) return null;

	const handleChange = ({ target }) => {
		const type = target.dataset.type;

		setDate({ ...date, [type]: target.value });
	};

	const handleCreate = () => {
		const batch = createBatch(name, {
			start: new Date(date.start),
			end: new Date(date.end)
		});

		dispatch((dispatch, getState) => {
			const state = getState().budgets;

			dispatch(batchCreated(batch));
			dispatch(toggledModal(ModalE.BATCH_C));

			batchService.createBatch(batch, {
				error: () => {
					dispatch(stateLoaded(state));
					dispatch(toggledModal(ModalE.BATCH_C));
				}
			});
		});
	};

	const handleUpdate = () => {};

	const handleDelete = () => {};

	return (
		<Modal
			theme={window.theme}
			title={isUpdate ? "Modify Batch" : "Create New Batch"}>
			<Input
				placeholder="batch name"
				value={name}
				onChange={e => setName(e.target.value)}
			/>

			<Input
				type="date"
				value={date.start}
				data-type="start"
				placeholder="batch name"
				onChange={handleChange}
			/>
			<Input
				type="date"
				value={date.end}
				data-type="end"
				placeholder="batch name"
				onChange={handleChange}
			/>

			<div>
				{isCreate && (
					<Button color={window.theme.primary} onClick={handleCreate}>
						create
					</Button>
				)}

				{isUpdate && (
					<>
						<Button color={window.theme.primary} onClick={handleUpdate}>
							update
						</Button>
						<Button color={window.theme.secondary} onClick={handleDelete}>
							delete
						</Button>
					</>
				)}

				<CancelButton modal={isCreate ? ModalE.BATCH_C : ModalE.BATCH_M} />
			</div>
		</Modal>
	);
};

export { BatchButton };

export default CreateBatch;
