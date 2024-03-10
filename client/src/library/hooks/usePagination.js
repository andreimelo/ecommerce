import { useState } from 'react';
const usePagination = (data, count) => {
	const [
		pagination,
		setPagination,
	] = useState(1);

	function handlePagination(pageNumber){
		setPagination(pageNumber);
	}

	const previousPage = () => {
		if (pagination !== 1) {
			setPagination((prevPage) => prevPage - 1);
		}
	};

	const nextPage = () => {
		setPagination((prevPage) => prevPage + 1);
	};

	const indexOfLastRecord = pagination * count;
	const indexOfFirstRecord = indexOfLastRecord - count;
	const dataResult = data.slice(indexOfFirstRecord, indexOfLastRecord);

	return {
		count,
		pagination,
		handlePagination,
		previousPage,
		nextPage,
		dataResult,
	};
};

export default usePagination;
