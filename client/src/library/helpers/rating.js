export const showAverageRating = (data) => {
	if (data && data.ratings) {
		const ratingsArray = data.ratings;
		const totalRatings = ratingsArray.reduce(
			(total, rating) => total + rating.star,
			0,
		);
		const numberOfRatings = ratingsArray.length;

		// Calculate the average rating
		const averageRating = totalRatings / numberOfRatings;

		return {
			average : averageRating, // Round to one decimal place
			length  : numberOfRatings,
		};
	}
	return 0;
};

export const numberOfStar = [
	1,
	2,
	3,
	4,
	5,
];
