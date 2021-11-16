import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import BatchSelect from "../common/batchSelect";
import BudgetSelect from "../common/budgetSelect";
import Logout from "../common/logout";
import { CreateBatchButton } from "../modal/createBatch";
import { CreateBudgetButton } from "../modal/createBudget";
import Header from "./header";

function Settings() {
	const dispatch = useAppDispatch();

	const isSetting = useAppSelector(selectModal(ModalE.SETTING));

	if (!isSetting) return null;

	const handleClose = ({ target: { dataset } }: any) => {
		if (dataset.setting) dispatch(toggledModal(ModalE.SETTING));
	};

	return (
		<Modal onClick={handleClose} data-setting>
			<div className="setting">
				<Header />

				<ul>
					<li>
						<div className="setting-select">
							<BatchSelect />
						</div>
					</li>
					<li>
						<div className="setting-select">
							<BudgetSelect />
						</div>
					</li>
				</ul>

				<ul onClick={() => toast.info("Under construction")}>
					<li>Edit Batch</li>
					<li>Edit Budget</li>
				</ul>

				<ul>
					<li>
						<CreateBatchButton />
					</li>
					<li>
						<CreateBudgetButton />
					</li>
				</ul>

				<ul>
					<li>
						<Logout />
					</li>
				</ul>
			</div>
		</Modal>
	);
}

const Modal = styled.div`
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: #00000014;
	display: flex;
	align-items: flex-end;
	z-index: 1;

	.setting {
		width: 200px;
		height: inherit;
		background: ${window.theme.gray};
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 1px 5px 30px #1f1e1e5c;
	}

	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		border-bottom: 1px groove black;
	}
	ul:last-child {
		border: none;
	}

	li {
		text-align: left;
		padding: 8px 25px;
		cursor: pointer;
		border: 1px solid ${window.theme.gray};
		text-transform: capitalize;
	}

	.setting-select {
		height: inherit;
	}
`;

export default Settings;
