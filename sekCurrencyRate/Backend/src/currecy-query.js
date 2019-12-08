import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyRateLimit from 'fastify-rate-limit';

import { convert, login, search } from './routes';

class CurrencyQuery {
	start(port) {
		this._fastify = fastify();

		this._initJWT();

		this._initRateLimit();

		this._initRoute();

		this._fastify.listen(port, (err, address) => {
			if (err) {
				throw err;
			}

			console.log(`server listening on ${address}`);
		});
	}

	_initRoute() {
		this._fastify.register(login, { prefix: '/api' });
		this._fastify.register(search, { prefix: '/api' });
		this._fastify.register(convert, { prefix: '/api' });
	}

	_initRateLimit() {
		this._fastify.register(fastifyRateLimit, {
			max: 30,
			keyGenerator: (request) => {
				return request.req.headers['authorization'] || request.raw.ip;
			},
		});
	}

	_initJWT() {
		this._fastify.register(fastifyJWT, {
			secret: 'Batman?:P',
			sign: {
				expiresIn: '30m',
				algorithm: 'HS256',
			},
			verify: {
				algorithms: ['HS256'],
			},
		});

		this._fastify.decorate('verifyJWT', (request, reply, done) => {
			if (!request.req.headers['authorization']) {
				reply.code(401);
				done(new Error('Missing token header'));
			}

			request.jwtVerify((err, decoded) => {
				try {
					if (err || !decoded) {
						reply.code(401);
						done(new Error('Token not valid'));
					}

					done();
				} catch (err) {
					reply.code(401);
					done(new Error('Token not valid'));
				}
			});
		});
	}
}

export { CurrencyQuery };
