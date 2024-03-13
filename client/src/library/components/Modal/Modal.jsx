import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ modalTitle, isOpen, onClose, children, modalContainerClass }) => {
	return (
		<div
			className={`fixed z-10 inset-0 overflow-y-auto ${
				isOpen ? 'block' :
				'hidden'}`}
			style={{ background: 'rgba(0, 0, 0, 0.5)' }}
		>
			<div className='flex items-center justify-center min-h-screen p-4'>
				<div className='fixed inset-0 transition-opacity' aria-hidden='true' />

				<div className={modalContainerClass}>
					<div className='flex justify-between p-4 border-b'>
						<h2 className='text-lg font-semibold'>{modalTitle}</h2>
						<button
							className='text-gray-500 hover:text-gray-700'
							onClick={onClose}
						>
							<svg
								className='w-6 h-6 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M10 9.414l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 10z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</div>

					<div className='p-4'>{children}</div>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen              : PropTypes.bool,
	onClose             : PropTypes.func,
	children            : PropTypes.element,
	modalTitle          : PropTypes.string,
	modalContainerClass : PropTypes.string,
};
Modal.defaultProps = {
	isOpen              : '',
	onClose             : () => {},
	children            : '',
	modalTitle          : 'Modal Title',
	modalContainerClass : 'relative bg-white rounded-lg shadow-xl max-w-lg mx-auto',
};

export default Modal;
