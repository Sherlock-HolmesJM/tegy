import styled from "styled-components";

import Button from "./common/button";
import Logout from "./common/logout";
import Menu from "../asset/menu";
import { CreateBudgetButton } from "./modal/createBudget";
import BudgetSelect from "./common/budgetSelect";

function Header() {
	const { primary } = window.theme;

	return (
		<Headerr>
			<div className="header-title">
				<Menu className="header-menu" />
				<em className="header-title-content">Tegy</em>
			</div>

			<div className="header-aside">
				<Button color={primary}>
					<CreateBudgetButton />
				</Button>
				<BudgetSelect />
				<Button>
					<Logout />
				</Button>
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
		display: flex;
		align-items: center;
		font-size: 23px;
		font-weight: 700;
		color: ${window.theme.primary};
		gap: 15px;
	}
	.header-title-content {
		display: inline-block;
	}

	.header-menu {
		/* display: none; */
		cursor: pointer;
	}

	.header-aside {
		display: flex;
	}

	@media (max-width: 615px) {
		.header-aside {
			display: none;
		}
		.header-menu {
			display: inline-block;
		}
	}
`;

export default Header;
