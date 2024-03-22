import { combineReducers } from 'redux';
import { userAuthenticationReducer } from './authentication';
import { searchReducer } from './search';

const rootReducer = combineReducers({
	user   : userAuthenticationReducer,
	search : searchReducer,
});

export default rootReducer;
