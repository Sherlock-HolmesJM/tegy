import { useState, useEffect } from "react";
import {
	batchCreated,
	batchUpdated,
	selectBatch,
	selectBatchList,
	stateLoaded
} from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import { postBatch, patchBatch } from "../../services/batchService";
import { createBatch } from "../../utils/batch";
import Button from "../common/button";
import Input from "../common/input";
import { Modal, CancelButton } from "./base";

const BatchModal = () => {
	const dispatch = useAppDispatch();

	const isCreate = useAppSelector(selectModal(ModalE.BATCH_C));
	const isUpdate = useAppSelector(selectModal(ModalE.BATCH_M));
	const batch = useAppSelector(selectBatch);
	const { length: batchCount } = useAppSelector(selectBatchList);

	const [date, setDate] = useState({ end: "", start: "" });
	const [name, setName] = useState("");

	useEffect(() => {
		if (isCreate || isUpdate) {
			setName(getName());
			setDate(getDate());
		}

		// eslint-disable-next-line
	}, [isCreate, isUpdate]);

	if (!isCreate && !isUpdate) return null;

	function format(date?: number) {
		const d = date ? new Date(date) : new Date();
		return d.toJSON().split("T")[0];
	}

	function getName() {
		return isUpdate ? batch.name : `batch ${batchCount + 1}`;
	}

	function getDate() {
		const { end, start } = isUpdate ? batch.date : { end: 0, start: 0 };
		return { end: format(end), start: format(start) };
	}

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

			postBatch(batch, {
				error: () => {
					dispatch(stateLoaded(state));
				}
			});
		});
	};

	const handleUpdate = () => {
		const b: Batch = {
			...batch,
			name,
			date: {
				start: new Date(date.start).getTime(),
				end: new Date(date.end).getTime()
			}
		};

		dispatch((dispatch, getState) => {
			const oldState = getState().budgets;

			dispatch(batchUpdated(b));

			patchBatch(b, {
				error: () => dispatch(stateLoaded(oldState))
			});
		});
	};

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
					<Button color={window.theme.primary} onClick={handleUpdate}>
						update
					</Button>
				)}

				{isUpdate && batchCount > 1 && (
					<Button color={window.theme.secondary} onClick={handleDelete}>
						delete
					</Button>
				)}

				<CancelButton modal={isCreate ? ModalE.BATCH_C : ModalE.BATCH_M} />
			</div>
		</Modal>
	);
};

const BatchButton = ({ mode }: { mode: "create" | "modify" }) => {
	const dispatch = useAppDispatch();

	const BATCH = mode === "create" ? ModalE.BATCH_C : ModalE.BATCH_M;

	return (
		<div onClick={() => dispatch(toggledModal(BATCH))}>
			{mode === "create" ? "New Batch" : "Edit Batch"}
		</div>
	);
};

export { BatchButton };

export default BatchModal;
