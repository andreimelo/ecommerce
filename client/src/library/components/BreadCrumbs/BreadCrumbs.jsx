import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import icons from '../../../resources/icons';

const BreadCrumbs = ({ category }) => {
	return (
		<nav class='flex mt-5 ' aria-label='Breadcrumb'>
			<ol class='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
				<li class='inline-flex items-center'>
					<Link
						class='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:hover:text-blue-600'
						to={'/'}
					>
						{icons['home']}
						Home
					</Link>
				</li>
				{category && (
					<li>
						<div class='flex items-center'>
							{icons['nextArrow']}
							<Link
								className='ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:hover:text-blue-600'
								to={`/category/${category.slug}`}
							>
								{category.name}
							</Link>
						</div>
					</li>
				)}
			</ol>
		</nav>
	);
};

BreadCrumbs.propTypes = {
	category : PropTypes.object,
};

BreadCrumbs.defaultProps = {
	category : {},
};

export default BreadCrumbs;
