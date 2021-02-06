export const isEmail = (email) => {
	return !/\S+@\S+\.\S+/.test(email);
};
