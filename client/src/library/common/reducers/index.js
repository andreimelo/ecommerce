import { combineReducers } from 'redux';
import { userAuthenticationReducer } from './authentication';
import { searchReducer } from './search';
import { cartReducer } from './cart';
import { drawerReducer } from './drawer';

const rootReducer = combineReducers({
	user   : userAuthenticationReducer,
	search : searchReducer,
	cart   : cartReducer,
	drawer : drawerReducer,
});

export default rootReducer;
