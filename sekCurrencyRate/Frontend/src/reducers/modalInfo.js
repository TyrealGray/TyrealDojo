import produce from 'immer';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions/actionTypes';

const initState = {
	isOpen: false,
};

const modalInfo = (state = initState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case OPEN_MODAL:
				draft.isOpen = true;
				break;
			case CLOSE_MODAL:
				draft.isOpen = false;
				break;
			default:
				return state;
		}
	});

export default modalInfo;
