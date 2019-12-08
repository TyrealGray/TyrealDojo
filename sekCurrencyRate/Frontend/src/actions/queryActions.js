import {
	ADD_COUNTRY,
	CONVERT_AMOUNT,
	SEARCH_COUNTRY,
	UPDATE_AMOUNT,
	UPDATE_CONVERSION,
} from './actionTypes';

export const addCountry = (country) => {
	return { type: ADD_COUNTRY, payload: { country } };
};

export const updateAmount = (amount) => {
	return { type: UPDATE_AMOUNT, payload: { amount } };
};

export const convertAmount = (amount) => {
	return async (dispatch, getState) => {
		if (isNaN(amount)) {
			return;
		}

		dispatch({ type: UPDATE_AMOUNT, payload: { amount } });

		const { countriesInfo, authInfo } = getState();
		const { countries } = countriesInfo;
		const codes = [];

		for (const country in countries) {
			const { currencies } = countries[country];

			if (currencies && currencies.length !== 0) {
				for (let index = 0; index < currencies.length; ++index) {
					let currency = currencies[index];
					if (!isNaN(currency.rateToSEK)) {
						codes.push(currency.code);
					}
				}
			}
		}

		if (codes.length === 0) {
			return;
		}

		const payload = { codes, amount };

		dispatch({ type: CONVERT_AMOUNT, payload });

		try {
			const response = await fetch('/api/convert', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: authInfo.token,
				},
				body: JSON.stringify(payload),
			});

			if (response.status !== 200) {
				console.error('request failed!');
				return;
			}

			dispatch({
				type: UPDATE_CONVERSION,
				payload: await response.json(),
			});
		} catch (e) {
			console.error(e);
		}
	};
};

export const searchCountry = (name) => {
	return async (dispatch, getState) => {
		const { authInfo } = getState();
		dispatch({ type: SEARCH_COUNTRY });
		try {
			const response = await fetch('/api/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: authInfo.token,
				},
				body: JSON.stringify({ name }),
			});

			if (response.status !== 200) {
				console.error('request failed!');
				return { countriesInfo: [] };
			}

			return await response.json();
		} catch (e) {
			console.error(e);
		}
	};
};
