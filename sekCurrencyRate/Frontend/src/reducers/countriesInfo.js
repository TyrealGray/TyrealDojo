import produce from 'immer';
import { ADD_COUNTRY } from '../actions/actionTypes';

const initState = {
	countries: {},
};

const countriesInfo = (state = initState, action) =>
	produce(state, (draft) => {
		const payload = action.payload || {};
		switch (action.type) {
			case ADD_COUNTRY:
				draft.countries[payload.country.name] = payload.country;
				break;
			default:
				return state;
		}
	});

export default countriesInfo;
