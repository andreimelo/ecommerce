import { combineReducers } from 'redux';
import { userAuthenticationReducer } from './authentication';

const rootReducer = combineReducers({
	user : userAuthenticationReducer,
});

export default rootReducer;
