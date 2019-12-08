import fetch from 'node-fetch';

const getRateToSEK = async (currency) => {
	const QUERY_FAILED = `Querying ${currency.code} exchange rate failed`;

	try {
		const currencyRes = await fetch(
			`https://api.exchangeratesapi.io/latest?base=${currency.code}&symbols=SEK`,
		);
		const ratesJson = await currencyRes.json();
		const rateToSEK =
			ratesJson && !ratesJson.error ? ratesJson.rates.SEK : QUERY_FAILED;

		return {
			...currency,
			rateToSEK,
		};
	} catch (e) {
		return {
			...currency,
			rateToSEK: QUERY_FAILED,
		};
	}
};

const getCurrenciesInfo = (currencies) => {
	return Promise.all(currencies.map((currency) => getRateToSEK(currency)));
};

async function searchHandler(req, reply) {
	try {
		const name = req.body.name;
		const countriesRes = await fetch(
			`https://restcountries.eu/rest/v2/name/${name}?fields=name;population;currencies`,
		);
		const countries = await countriesRes.json();
		const countriesInfo = [];

		if (countries && countries.length > 0) {
			for (const country of countries) {
				country.currencies = await getCurrenciesInfo(
					country.currencies,
				);

				countriesInfo.push(country);
			}
		}

		reply.type('application/json').code(200);
		return { countriesInfo };
	} catch (e) {
		console.log(e.stack);
		reply.type('application/json').code(500);
		return { msg: 'search service error' };
	}
}

const search = (fastify, opts, next) => {
	fastify.route({
		method: 'POST',
		url: '/search',
		onRequest: (request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: searchHandler,
	});

	next();
};

export { search };
