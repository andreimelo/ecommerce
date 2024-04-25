import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../../resources/icons';
import { Link } from 'react-router-dom';

const Table = ({
	tableContainerClass,
	tableClass,
	data,
	onClick,
	searchFilter,
	searchValue,
	linkTo,
	category,
	thead,
}) => {
	return (
		<div className={tableContainerClass}>
			<table className={tableClass}>
				{thead}
				{category &&
					data &&
					data.filter(searchFilter(searchValue)).map((item) => (
						<tbody key={item._id} className='text-gray-700'>
							<tr>
								<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
									{item.name}
								</td>
								<td
									className='px-6 py-4'
									onClick={() => onClick(item.slug)}
								>
									{icons['delete']}
								</td>
								<Link to={`${linkTo}/${item.slug}`}>
									<td className='px-6 py-4'>{icons['edit']}</td>
								</Link>
							</tr>
						</tbody>
					))}
			</table>
		</div>
	);
};

Table.propTypes = {
	tableContainerClass : PropTypes.string,
	tableClass          : PropTypes.string,
	data                : PropTypes.array.isRequired,
	onClick             : PropTypes.func,
	searchFilter        : PropTypes.func,
	searchValue         : PropTypes.string,
	linkTo              : PropTypes.string,
	category            : PropTypes.bool,
	thead               : PropTypes.any,
};

Table.defaultProps = {
	tableContainerClass : 'relative overflow-x-auto shadow-md sm:rounded-lg my-10',
	tableClass          : 'w-full text-sm text-left rtl:text-right bg-gray-100',
	data                : [],
	onClick             : () => {},
	searchFilter        : () => {},
	searchValue         : [],
	linkTo              : '',
	category            : false,
	thead               : '',
};

export default React.memo(Table);
