import styled from "styled-components";
import {
	headsUpdated,
	selectBudgetList,
	selectHeads
} from "../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { ModalE, toggledModal } from "../model/uiSlice";
import { updateHeads } from "../services/stateService";
import Button from "./common/button";
import Logout from "./common/logout";
import Select from "./common/select";

interface Props {}

function Header(props: Props) {
	const dispatch = useAppDispatch();

	const list = useAppSelector(selectBudgetList);
	const heads = useAppSelector(selectHeads);

	const { primary } = window.theme;

	const handleBudgetChange = (id: string) => {
		const oldHeads = { ...heads };
		const newHeads = { ...heads, budget: id };

		dispatch(headsUpdated(newHeads));
		updateHeads(newHeads, {
			error: () => dispatch(headsUpdated(oldHeads))
		});
	};

	return (
		<Headerr>
			<div className="header-title">
				{/* <em className="header-title-content">==</em> */}
				<em className="header-title-content">Tegy</em>
			</div>

			<div className="header-aside">
				<Button
					color={primary}
					onClick={() => dispatch(toggledModal(ModalE.BUDGET))}>
					New Budget
				</Button>
				<Select
					value={heads.budget}
					options={list}
					onSelect={handleBudgetChange}
					color={window.theme.gray}
				/>
				<Logout />
			</div>
		</Headerr>
	);
}

const Headerr = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 12px;
	background-color: ${window.theme.gray};

	.header-title {
		font-size: 23px;
		font-weight: 700;
		color: ${window.theme.primary};
	}
	.header-title-content {
		display: inline-block;
		margin-right: 10px;
	}
	.header-aside {
		display: flex;
	}
`;

export default Header;
