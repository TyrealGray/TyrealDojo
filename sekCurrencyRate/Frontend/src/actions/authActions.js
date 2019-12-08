import { AUTHENTICATED, LOGIN } from './actionTypes';

export const login = () => {
	return async (dispatch) => {
		dispatch({ type: LOGIN });
		const response = await fetch('/api/login', {
			method: 'POST',
		});

		const payload = await response.json();

		return dispatch({ type: AUTHENTICATED, payload });
	};
};
