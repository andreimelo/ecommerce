import React from 'react';
import PropTypes from 'prop-types';

function Panel({ title, action, children, className }) {
	return (
		<section className={`rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur ${className}`}>
			<div className='mb-6 flex items-center justify-between gap-4'>
				<div>
					<h2 className='text-lg font-semibold text-slate-900'>{title}</h2>
				</div>
				{action}
			</div>
			{children}
		</section>
	);
}

Panel.propTypes = {
	title     : PropTypes.string.isRequired,
	action    : PropTypes.node,
	children  : PropTypes.node.isRequired,
	className : PropTypes.string,
};

Panel.defaultProps = {
	action    : null,
	className : '',
};

export default Panel;
