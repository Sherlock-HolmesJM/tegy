export const strip = (object: any, fields: string[]) => {
	const clone = { ...object };
	fields.forEach(field => {
		delete clone[field];
	});

	return clone;
};

export default strip;
