import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { promise } from './../../../library/common/config/stripe';
import StripeCheckout from './component/StripeCheckout';

const Payment = () => {
	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<div className='w-1/2 mx-auto'>
				<div className='text-center font-semibold text-xl my-5'>
					Complete your purchase
				</div>
				<Elements stripe={promise}>
					<StripeCheckout />
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
