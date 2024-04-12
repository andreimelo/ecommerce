export function drawerReducer(state = false, action){
	switch (action.type) {
		case 'SET_VISIBLE_DRAWER':
			return action.payload;
		default:
			return state;
	}
}
