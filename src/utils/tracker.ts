import anime from "animejs";
import { formatAmount } from "./money";

const animeBalance = (className: string, total: number) => {
	const el = document.querySelector("." + className);

	const balance = { b: 0 };

	anime({
		targets: balance,
		b: total,
		round: 1,
		easing: "linear",
		update: function () {
			el.innerHTML = formatAmount(balance.b, "+");
		}
	});
};

export { animeBalance };
