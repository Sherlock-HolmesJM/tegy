export const formatAmount = (value: number, sign = "") => {
	if (value === 0) return value + ".00";

	const head = (value + "").split("");
	const tails: string[] = [];

	for (let i = head.length; i > 3; i -= 3) {
		const index = head.length - 3;
		const tail = head.splice(index, 3).join("");
		tails.push(tail);
	}

	sign = head.includes("-") ? head.splice(0, 1)[0] : sign;

	if (tails.length === 0) return `${sign} ${head.join("")}.00`.trim();

	const tail = tails.reverse().join(",") + ".00";

	const head_string = head.length === 1 ? head[0] + "," : head.join(",");

	return `${sign} ${head_string}${tail}`.trim();
};

export const percentage = (total: number, value: number) => {
	return value && total ? Math.round((value / total) * 100) : 0;
};
