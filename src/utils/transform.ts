export const arrayToObject = (list: { id: string }[]) => {
	const object = {};

	list.forEach(item => {
		object[item.id] = item;
	});

	return object;
};
