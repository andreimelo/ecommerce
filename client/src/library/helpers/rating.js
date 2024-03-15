export const showAverageRating = (data) => {
	if (data && data.ratings) {
		let ratingsArray = data && data.ratings;
		let total = [];
		let length = ratingsArray.length;
		console.log(length, 'length');

		ratingsArray.map((item) => total.push(item.star));
		let totalReduced = total.reduce((item, index) => item + index, 0);
		console.log(totalReduced, 'totalReduced');
		let highest = length + 5;
		console.log(highest, 'highest');

		let result = totalReduced * 5 / highest;

		return result;
	}
	return;
};

export const numberOfStar = [
	1,
	2,
	3,
	4,
	5,
];
