import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ modalTitle, isOpen, onClose, children, modalContainerClass }) => {
	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.body.style.overflow = originalOverflow;
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	return (
		<div
			className={`fixed inset-0 z-50 overflow-y-auto ${
				isOpen ? 'block' :
				'hidden'}`}
			style={{ background: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(6px)' }}
		>
			<div className='flex min-h-screen items-center justify-center p-4 md:p-8'>
				<button
					type='button'
					className='fixed inset-0 transition-opacity'
					aria-label='Close modal backdrop'
					onClick={onClose}
				/>
				<div className={modalContainerClass} role='dialog' aria-modal='true' aria-label={modalTitle}>
					<div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur'>
						<h2 className='text-lg font-semibold text-slate-900'>{modalTitle}</h2>
						<button
							type='button'
							className='rounded-full p-1 text-gray-500 transition hover:bg-slate-100 hover:text-gray-700'
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

					<div className='p-5'>{children}</div>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	isOpen              : PropTypes.bool,
	onClose             : PropTypes.func,
	children            : PropTypes.node,
	modalTitle          : PropTypes.string,
	modalContainerClass : PropTypes.string,
};
Modal.defaultProps = {
	isOpen              : false,
	onClose             : () => {},
	children            : null,
	modalTitle          : 'Modal Title',
	modalContainerClass : 'relative mx-auto w-full max-w-lg rounded-[28px] bg-white shadow-xl',
};

export default Modal;
