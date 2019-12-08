const CurrencyQuery = require('./bin/currecy-query').CurrencyQuery;
const server = new CurrencyQuery();

server.start(2019);