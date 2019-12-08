async function loginHandler(req, reply) {
	try {
		const token = await this.jwt.sign({});
		reply.type('application/json').code(200);
		return { token };
	} catch (e) {
		console.log(e.stack);
		reply.type('application/json').code(500);
		return { msg: 'login error' };
	}
}

const login = (fastify, opts, next) => {
	fastify.route({
		method: 'POST',
		url: '/login',
		handler: loginHandler,
	});

	next();
};

export { login };
