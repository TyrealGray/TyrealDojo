import produce from 'immer';
import { UPDATE_AMOUNT, UPDATE_CONVERSION } from '../actions/actionTypes';

const initState = {
	rates: {},
	amount: 0,
};

const conversionInfo = (state = initState, action) =>
	produce(state, (draft) => {
		const payload = action.payload || {};
		switch (action.type) {
			case UPDATE_CONVERSION:
				for (const code in payload.rates) {
					if (payload.rates[code] !== draft.rates[code]) {
						draft.rates[code] = payload.rates[code];
					}
				}
				break;
			case UPDATE_AMOUNT:
				if (draft.amount !== payload.amount) {
					draft.amount = payload.amount;
				}
				break;
			default:
				return state;
		}
	});

export default conversionInfo;
