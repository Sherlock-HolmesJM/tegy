import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createdBatch, selectBatchList } from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import batchService from "../../services/batchService";
import { createBatch } from "../../utils/batch";
import Button from "../common/button";
import Input from "../common/input";
import { ModalWrapper } from "./base";

const CreateBatch = () => {
	const dispatch = useAppDispatch();

	const showModal = useAppSelector(selectModal(ModalE.BATCH));
	const { length: count } = useAppSelector(selectBatchList);

	const [date, setDate] = useState({
		start: new Date().toJSON().split("T")[0],
		end: new Date().toJSON().split("T")[0]
	});

	const [name, setName] = useState(`batch ${count + 1}`);

	useEffect(() => setName(`batch ${count + 1}`), [count]);

	if (!showModal) return null;

	const handleChange = ({ target }) => {
		const type = target.dataset.type;

		setDate({ ...date, [type]: target.value });
	};

	const handleCreate = () => {
		dispatch(dispatch => {
			const batch = createBatch(name, {
				start: new Date(date.start),
				end: new Date(date.end)
			});

			batchService.createBatch(batch, {
				onSuccess: () => {
					dispatch(createdBatch(batch));
					handleClose();
					toast.success("Created successfully.");
				}
			});
		});
	};

	const handleClose = () => {
		dispatch(toggledModal(ModalE.BATCH));
	};

	return (
		<ModalWrapper theme={window.theme} title="Create New Batch">
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
				<Button color={window.theme.primary} onClick={handleCreate}>
					create
				</Button>
				<Button color={window.theme.secondary} onClick={handleClose}>
					Cancel
				</Button>
			</div>
		</ModalWrapper>
	);
};

export default CreateBatch;
