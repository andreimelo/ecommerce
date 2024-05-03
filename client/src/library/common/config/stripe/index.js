import { loadStripe } from '@stripe/stripe-js';
import env from '../env';

export const promise = loadStripe(env.stripe.credentials['api_key']);
