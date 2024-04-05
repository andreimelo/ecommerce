import { combineReducers } from 'redux';
import { userAuthenticationReducer } from './authentication';
import { searchReducer } from './search';
import { cartReducer } from './cart';

const rootReducer = combineReducers({
	user   : userAuthenticationReducer,
	search : searchReducer,
	cart   : cartReducer,
});

export default rootReducer;
