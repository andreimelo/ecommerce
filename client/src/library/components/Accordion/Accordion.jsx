import React, { useState } from 'react';
import PropTypes from 'prop-types';
import icons from '../../../resources/icons';

const Accordion = ({ data, containerClass }) => {
	const [
		openIndexes,
		setOpenIndexes,
	] = useState([]);

	// Function to toggle the open/close status of an accordion item
	const toggleAccordion = (index) => {
		if (openIndexes.includes(index)) {
			setOpenIndexes(openIndexes.filter((i) => i !== index));
		}
		else {
			setOpenIndexes([
				...openIndexes,
				index,
			]);
		}
	};

	return data.map((item, index) => (
		<div key={index} className={containerClass}>
			<div
				onClick={() => toggleAccordion(index)}
				className='flex justify-between items-center py-2 cursor-pointer'
			>
				<h3 className='text-sm font-medium'>{item.title}</h3>
				{
					openIndexes.includes(index) ? <div className='px-5'>
						{icons['chevronUpSm']}
					</div> :
					<div className='px-5'>{icons['chevronDownSm']}</div>}
			</div>
			{openIndexes.includes(index) && <div className='pb-2'>{item.content}</div>}
		</div>
	));
};

Accordion.propTypes = {
	data           : PropTypes.array,
	containerClass : PropTypes.string,
};

Accordion.defaultProps = {
	data           : [],
	containerClass : 'border-b border-gray-200',
};

export default Accordion;
