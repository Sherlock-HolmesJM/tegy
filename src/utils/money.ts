export const formatAmount = (value: number) => {
	const head = (value + "").split("");
	const tails: string[] = [];

	for (let i = head.length; i > 3; i -= 3) {
		const index = head.length - 3;
		const tail = head.splice(index, 3).join("");
		tails.push(tail);
	}

	if (tails.length === 0) return `${head.join("")}.00`;
	return `${head.join("")},${tails.reverse().join(",")}.00`;
};

export const percentage = (total: number, value: number) =>
	Math.round((value / total) * 100);
