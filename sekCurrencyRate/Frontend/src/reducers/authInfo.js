import produce from 'immer';
import { AUTHENTICATED } from '../actions/actionTypes';

const initState = {
	token: '',
};

const authInfo = (state = initState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case AUTHENTICATED:
				draft.token = `bearer ${action.payload.token}`;
				break;
			default:
				return state;
		}
	});

export default authInfo;
