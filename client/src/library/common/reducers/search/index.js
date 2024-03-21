export function searchReducer(state = { text: '', submitted: false }, action){
	switch (action.type) {
		case 'SEARCH_QUERY':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
