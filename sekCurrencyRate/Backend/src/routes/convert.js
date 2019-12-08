import fetch from 'node-fetch';

const round = (value, decimals) => {
	/**
	 * next line is a solution from StackOverflow, I know I know, need unit test, I will do it. Later :P
	 */
	return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
};

const getConversionFromSEK = async (amount, codes) => {
	try {
		const currencyRes = await fetch(
			`https://api.exchangeratesapi.io/latest?base=SEK&symbols=${codes.join(
				',',
			)}`,
		);
		const ratesJson = await currencyRes.json();
		const rates = {};

		for (const code in ratesJson.rates) {
			const rate = ratesJson.rates[code];
			rates[code] = round(rate * amount, 2);
		}

		return rates;
	} catch (e) {
		console.log(e);
	}
};

async function convertHandler(req, reply) {
	try {
		const codes = req.body.codes;
		const rates = await getConversionFromSEK(req.body.amount, codes);

		reply.type('application/json').code(200);
		return { rates };
	} catch (e) {
		console.log(e.stack);
		reply.type('application/json').code(500);
		return { msg: 'convert service error' };
	}
}

const convert = (fastify, opts, next) => {
	fastify.route({
		method: 'POST',
		url: '/convert',
		onRequest: (request, reply, done) => {
			fastify.verifyJWT(request, reply, done);
		},
		handler: convertHandler,
	});

	next();
};

export { convert };
