import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';

const MultiRangeSlider = ({ value, min, max, onChange }) => {
	return (
		<div className='mx-3'>
			<Slider min={min} max={max} defaultValue={value} onChange={onChange} range />
			<div className='flex justify-between mt-2'>
				{value && value.map((item, index) => <span key={index}>$ {item}</span>)}
			</div>
		</div>
	);
};

MultiRangeSlider.propTypes = {
	value    : PropTypes.array,
	onChange : PropTypes.func,
	min      : PropTypes.number,
	max      : PropTypes.number,
};

MultiRangeSlider.defaultProps = {
	value    : [],
	onChange : () => {},
	min      : 0,
	max      : 0,
};

export default MultiRangeSlider;
