import { combineReducers } from 'redux';
import { userAuthenticationReducer } from './authentication';
import { searchReducer } from './search';
import { cartReducer } from './cart';
import { drawerReducer } from './drawer';
import { couponReducer } from './coupon';

const rootReducer = combineReducers({
	user   : userAuthenticationReducer,
	search : searchReducer,
	cart   : cartReducer,
	drawer : drawerReducer,
	coupon : couponReducer,
});

export default rootReducer;
