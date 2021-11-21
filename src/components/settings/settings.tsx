import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import BatchSelect from "../common/batchSelect";
import BudgetSelect from "../common/budgetSelect";
import Logout from "../common/logout";
import { BatchButton } from "../modal/createBatch";
import { CreateBudgetButton } from "../modal/createBudget";
import Header from "./header";

function Settings() {
	const dispatch = useAppDispatch();
	const isSetting = useAppSelector(selectModal(ModalE.SETTING));
	const [anim, setAnim] = useState("");

	if (!isSetting) return null;

	const handleClose = ({ target: { dataset } }: any) => {
		if (dataset.setting) {
			setAnim("animate__backOutLeft");

			setTimeout(() => {
				dispatch(toggledModal(ModalE.SETTING));
				setAnim("");
			}, 600);
		}
	};

	return (
		<Modal onClick={handleClose} data-setting>
			<div
				className={`setting animate__animated ${anim}`}
				data-aos="fade-right">
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

				<ul>
					<li>
						<BatchButton mode="modify" />
					</li>
					<li onClick={() => toast.info("Under construction")}>Edit Budget</li>
				</ul>

				<ul>
					<li>
						<BatchButton mode="create" />
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
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: #00000014;
	display: flex;
	align-items: flex-end;
	z-index: 2;

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
